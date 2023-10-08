from typing import List
from datetime import datetime, timedelta
import pandas as pd
import numpy as np


from tests.coordinates.coordinates_utils import (
    find_correlations,
    COORDINATES,
    get_outliers,
    get_moving_average,
)


sigma_sum = 2
sigma_diff = 2.2
minutes_b = 15
minutes = 20


def magnetic_field_tests(date_times_list: list, data: pd.DataFrame) -> List[datetime]:
    approved_date_times = []
    for _time in date_times_list:
        try:
            interval = timedelta(minutes=minutes_b)
            for coordinate in COORDINATES:
                b = (
                    data["B{}".format(coordinate)]
                    .loc[_time - interval : _time + interval]
                    .dropna()
                )
                if (
                    (b < 0).any()
                    and (b > 0).any()
                    and average_magnetic_field_tests(
                        _time, data["B{}".format(coordinate)]
                    )
                ):
                    approved_date_times.append(_time)
                    break
        except TypeError:
            pass  # There was a nan
    return approved_date_times


def average_magnetic_field_tests(
    date_time: datetime, data_column: pd.DataFrame, minutes_around: int = 10
) -> List[datetime]:
    approved_date_times = []

    # minutes around in timedelta format
    interval = timedelta(minutes=minutes_around)

    # get the values to consider before (left) and after (right) the event date
    b_left = data_column.loc[date_time - interval : date_time].dropna()
    b_right = data_column.loc[date_time : date_time + interval].dropna()

    # get the average moving of before and after the event date for 2 mins
    moving_average_b_left = get_moving_average(b_left, minutes=2)
    moving_average_b_right = get_moving_average(b_right, minutes=2)

    # want to get rid of high middle value that might skew the results
    average_b_left = np.mean(b_left.iloc[:-1].values)
    average_b_right = np.mean(b_right.iloc[1:].values)

    # get the manimum standard deviation of the before and after the event date
    std_b = np.max(
        [
            (b_left - moving_average_b_left).std(),
            (b_right - moving_average_b_right).std(),
        ]
    )

    # if the difference between the average of the before and after the event date is greater
    # the maximum std and the sign of the average of the before and after the event date is not the same
    # then add the event date to the approved_date_times
    standard_deviations = 2 * std_b

    if (
        np.abs(average_b_left - average_b_right) > standard_deviations
        or np.isnan(std_b)
    ) and (np.sign(average_b_right) != np.sign(average_b_left)):
        approved_date_times.append(date_time)
    return approved_date_times


def outliers_test(
    data: pd.DataFrame, sigma_sum: float, sigma_diff: float, minutes: float = 10
) -> List[datetime]:
    data["correlation_sum_outliers"] = get_outliers(
        data["correlation_sum"],
        standard_deviations=sigma_sum,
        ignore_minutes_around=3,
        reference=0,
        minutes=minutes,
    )

    data["correlation_diff_outliers"] = get_outliers(
        data["correlation_diff"], standard_deviations=sigma_diff, minutes=minutes
    )

    outlier_date_time: list[datetime] = []
    for index, value in data["correlation_diff_outliers"].items():
        index: pd.Timestamp = index
        interval = timedelta(minutes=minutes)
        sum_outliers = data.loc[
            index - interval : index + interval, "correlation_sum_outliers"
        ]
        # ensure there is a positive and a negative value in sum_outliers
        if (sum_outliers > 0).any() and (sum_outliers < 0).any():
            outlier_date_time.append(index.to_pydatetime())

    # outliner_date_time is a list of dates or times that has a postive or negiative outlier around it
    # [
    #    sum_outliers = data.loc[
    #        index - interval : index + interval, "correlation_sum_outliers"
    #    ] .index
    # ]

    n = 0
    groups_n = 0
    grouped_outliers: list[list] = []
    while n < len(outlier_date_time) - 1:
        # grouped_outliers.append([])
        # grouped_outliers[groups_n].append(outlier_date_time[n])
        grouped_outliers.append([outlier_date_time[n]])
        # n is the number of the date or time in the grouped_outliers
        n += 1
        # if the difference between the date or time and the next date or time is less than 130 seconds
        # and the n is less than the length of the outliner_date_time - 1
        while (
            # the diff seconds
            outlier_date_time[n]
            - outlier_date_time[n - 1]
        ).total_seconds() < 130 and n < len(outlier_date_time) - 1:
            # n < len(outer_date_time) - 1 is to ensure that the n is not the last date or time
            grouped_outliers[groups_n].append(outlier_date_time[n])
            n += 1

        # add 1 to groups index number after finish
        groups_n = groups_n + 1

    possible_date_times = []
    for group in grouped_outliers:
        maximum_in_group = data.loc[
            group, "correlation_diff_outliers"
        ]  # find max correlation_diff_outliers
        possible_date_times.append(maximum_in_group.idxmax())

    return possible_date_times


def find_reconnection_list_xyz(
    data: pd.DataFrame,
) -> List[datetime]:
    data = find_correlations(data)

    possible_events = outliers_test(
        data, sigma_sum=sigma_sum, sigma_diff=sigma_diff, minutes=minutes
    )
    if possible_events:
        possible_events = magnetic_field_tests(possible_events, data)
    else:
        return []
    return possible_events
