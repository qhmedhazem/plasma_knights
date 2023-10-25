import pandas as pd
from datetime import timedelta
import numpy as np

COORDINATES = ["x", "y", "z"]


def get_moving_average(data_column: pd.Series, minutes: int = 10) -> pd.Series:
    """
    Get the average of the data around a certain point
    :param data_column: column to average
    :param minutes: minutes to the right and to the left that will be considered when taking the moving average
    :return:
    """
    moving_average = pd.Series(
        np.zeros_like(data_column.values), index=data_column.index
    )
    # an a series of zeros with the same shape as the data column
    # with the same index as the data column

    for index, value in data_column.items():
        start_time = index - timedelta(minutes=minutes)
        end_time = index + timedelta(minutes=minutes)
        # the mean (الوسط الحسابي) of the data column between the start and end time
        moving_average.loc[index] = np.mean(data_column.loc[start_time:end_time])
    return moving_average


def get_outliers(
    data_column: pd.Series,
    minutes: float = 10,
    standard_deviations: float = 2,
    ignore_minutes_around: float = 0,
    reference="median",
) -> pd.Series:
    """
    Find outliers in a given column
    :param data_column: column to analyse
    :param minutes: minutes during which the data will be considered for the outliers tests
    :param standard_deviations: standard deviations that will be used when comparing data points to surrounding points
    :param ignore_minutes_around: number of minutes around potential events (to the right and to the left) to ignore
    :param reference: reference to use in comparison (median of value to consider or 0)
    :return:
    """
    # empty outliers series with the same shape as the data column
    outliers = pd.Series(np.zeros_like(data_column.values), index=data_column.index)

    for index, value in data_column.items():
        if not ignore_minutes_around:
            start_time = index - timedelta(minutes=minutes)
            end_time = index + timedelta(minutes=minutes)
            values_to_consider = data_column[data_column.index.values != index].loc[
                start_time:end_time
            ]
        else:
            # this ignores minutes around the potential point
            left_interval_start = index - timedelta(
                minutes=(minutes + ignore_minutes_around)
            )
            left_interval_end = index - timedelta(minutes=ignore_minutes_around)
            right_interval_start = index + timedelta(minutes=ignore_minutes_around)
            right_interval_end = index + timedelta(
                minutes=(minutes + ignore_minutes_around)
            )

            values_to_consider = pd.concat(
                (
                    data_column.loc[left_interval_start:left_interval_end],
                    data_column.loc[right_interval_start:right_interval_end],
                )
            )
            # print(values_to_consider)

        ##### IMPORTANT
        # values to consider is a series of considerd numbers that are not the value of the index
        # and not the numbers around the index that defined by the ignore_minutes_around
        #####

        # median is the middle value of a sorted list of numbers
        # media = الوسط الحسابي
        # if the reference is median it means that we comparing the diff data column
        if reference == "median":
            reference = values_to_consider.median()
        elif reference == 0:
            reference = 0

        # the absolute value of the difference between the value and the reference
        abs_diff = abs(value - reference)
        # if it medians

        # standard_deviations is the sigma sum * the std of the values to consider
        # if the differance between the value and the reference is greater than the standard_deviations
        # std is the measure of how spread out numbers are
        # if the std is 0.1 it means that the comparison is 0.1 * 2.2 (default for sigma diff) = 0.2
        # if the value is greater than the comparison it will be an outliner
        if abs_diff > standard_deviations * values_to_consider.std():
            # it will be an outliner
            outliers.loc[index] = value
        else:
            # if not it will be a NaN
            outliers.loc[index] = np.nan
    return outliers


def get_derivative(data_column: pd.Series) -> pd.Series:
    """
    Returns the derivative of the column.
    Derivative is given as difference of two consecutive data points divided by the time between them
    :param data_column: column to derive
    :return:
    """

    # the change of y divided by the change of x
    # y is the data columnmm
    # x is the time
    return data_column.diff() / data_column.index.to_series().diff().dt.total_seconds()


def find_correlations(data: pd.DataFrame) -> pd.DataFrame:
    coordinate_correlation_column_names = [
        #
    ]

    for coordinate in COORDINATES:
        field_column_name = "B" + coordinate
        v_column_name = "vp_" + coordinate

        field_column = data[field_column_name].interpolate("time")
        v_column = data[v_column_name].interpolate("time")
        # The interpolate function replaces the NaN values based on a specified method.
        # The method “time” works on daily and higher resolution data to interpolate given length of interval.

        # STEP 1 -> Calculate the mean
        # by using get_moving_average

        b_mean = get_moving_average(data[field_column_name])
        v_mean = get_moving_average(data[v_column_name])

        delta_b = get_derivative(field_column)
        delta_v = get_derivative(v_column)
        # Derivative is given as difference of two consecutive data points divided by the time between them
        # الفرق بين نقطتين متتاليتين مقسومة على الوقت الي بينهم: يعني
        # (list[1].Bx - list[0].Bx) / (list[1].time / list[0].time)
        # the result is a series of the same length as the original data, but with the first value being NaN

        # standard deviation is a measure of how spread out numbers aree
        # when it become a higher value it means that the data is more spread out
        # when i become a lower value it means that the data is more close to each other

        # step 2 & 3 ->
        std_b = (
            # the diff between the original data and the moving average of the original data
            data[field_column_name]
            - b_mean
        ).std()
        std_v = (
            # the diff between the original data and the moving average of the original data
            data[v_column_name]
            - v_mean
        ).std()
        # std is the

        # الارتباطات بين البيانات
        # correlation is a statistical measure that expresses the extent to which two variables are linearly related
        # العلاقة بين كل رقمين متتالين مقسومة على الانحراف المعايري للرقمين
        # مضروبة في بعض
        correlations = delta_b / std_b * delta_v / std_v
        # when the correlation is a high value it means that the data is more linearly related

        column_name = "correlation_{}".format(coordinate)

        # abs returns the absolute value of a number, it removes the sign of the number
        # apply the square root function then multiply the result by the sign of the number
        data[column_name] = correlations.abs().apply(np.sqrt) * correlations.apply(
            np.sign
        )
        coordinate_correlation_column_names.append(column_name)

    # the sum of the correlations of the three coordinates
    data["correlation_sum"] = data.loc[:, coordinate_correlation_column_names].sum(
        axis=1
    )

    # the difference between the correlation sum of two consecutive data points
    data["correlation_diff"] = get_derivative(data["correlation_sum"]).abs()

    # print(data["correlation_sum"], data["correlation_diff"])

    return data
