import datetime
import pandas as pd

# from data.cdas_datasets.wind import wind

# from data.omni_data_importer import DataImporter as SpecificDataImporter, OmniProbes
from data.omni_data_importer import DataImporter


def import_data(
    times: list[list[datetime.datetime]],
    # probe: OmniProbes,
    _log_progress: bool = False,
):
    start = times[0][0]
    end = times[len(times) - 1][1]
    data_importer = DataImporter(
        start_date=start,
        end_date=end,
        # probe=probe,
        log_progress_state=_log_progress,
    )

    final_data: list[pd.DataFrame] = []
    # data: pd.DataFrame = data_importer.import_data()
    data: pd.DataFrame = data_importer.import_data()

    # if _probe == "WIND":
    #     # data = wind(
    #     #     start_date=start.isoformat(),
    #     #     end_date=end.isoformat(),
    #     #     _log_progress=_log_progress,
    #     # )

    # elif _probe == "DSCOVR":
    #     data = data_importer.import_data_from_omni(
    #         # start_date=start, end_date=end, probe="DSCOVR", _log_progress=_log_progress
    #     )
    # elif _probe == "ACE":
    #     data = data_importer.import_data_from_omni(
    #         # start_date=start, end_date=end, probe="ACE", _log_progress=_log_progress
    #     )

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
            imported_data_subset.dropna()
            final_data.append(imported_data_subset)

    return (final_data, data_importer)
