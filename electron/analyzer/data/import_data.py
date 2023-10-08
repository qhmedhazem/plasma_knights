from enum import Enum
import datetime
import pandas as pd

from data.models.wind import wind
from data.models.dscovr import dscovr


class ProbeType(Enum):
    WIND = "WIND"
    ACE = "ACE"
    DSCOVR = "DSCOVR"


# [
#     (start_day, end_day),  # 2015/1/1 00:00:00 - 2015/1/1 23:59:59
#     (start_day, end_day),  # 2015/1/2 00:00:00 - 2015/1/2 23:59:59
# ]


def import_data(
    times: list[list[datetime.datetime]],
    _probe: ProbeType = "WIND",
    _log_progress: bool = False,
):
    start = times[0][0]
    end = times[len(times) - 1][1]

    final_data = []
    data: pd.DataFrame = None

    if _probe == "WIND":
        data = wind(
            start_date=start.isoformat(),
            end_date=end.isoformat(),
            _log_progress=_log_progress,
        )
    elif _probe == "DSCOVR":
        # data = dscovr(
        #     start_date=start.isoformat(),
        #     end_date=end.isoformat(),
        #     _log_progress=_log_progress,
        # )
        print("DATASET OF THIS SPACECRAFT IS NOT SUPPORTED RIGHT NOW")
        return None
    elif _probe == "ACE":
        print("DATASET OF THIS SPACECRAFT IS NOT SUPPORTED RIGHT NOW")
        return None
    ##
    # This section of code this returning DataFrame of times (the list of times) based on the date of the day
    ##

    # transfer dataframe to YYYY-MM-DD format to detect the imported data
    indices = list(set([datetime.datetime.strftime(i, "%Y-%m-%d") for i in data.index]))
    # 2015/10/01 00:01:23.232 -> 2015-10-01
    # %Y-%M-%D -> YYYY-MM-DD
    # ["2015/10/01", "2015/10/02", "2015/10/03"]

    for i in range(len(times)):  # loop every date
        start_day = times[i][0]
        end_day = times[i][1]
        if start_day.strftime("%Y-%m-%d") in indices:
            imported_data_subset = data.loc[start_day:end_day]
            final_data.append(imported_data_subset)

    return final_data


# Example of data

# index                     vp_x      vp_y      vp_z       n_p     r_sun        Bx        By        Bz
# [
#     [
#         # 2015/10/01 00:01:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
#         # 2015/10/01 00:02:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
#         # 2015/10/01 00:03:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
#     ],
#     [
#         # 2015/10/02 00:01:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
#         # 2015/10/02 00:02:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
#         # 2015/10/02 00:03:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
#     ],
# ]

# index                     vp_x      vp_y      vp_z       n_p     r_sun        Bx        By        Bz
# 2015/10/01 00:01:23.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
# 2015/10/02 00:02:26.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
# 2015/10/02 00:03:34.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
# 2015/10/03 00:04:12.232  0.000000  0.000000  0.000000  0.000000  0.999999  0.000000  0.000000  0.000000
