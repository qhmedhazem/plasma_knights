import requests
import pandas as pd
import numpy as np
import json
import cdflib
from datetime import datetime, timedelta

from utils.log import log


#   WORKING ON IT
def dscovr(start_date: str, end_date: str, _log_progress: bool = False):
    # cdf_file = cdflib.CDF("./data/models/cache/ac_h0_mfi_20020101_v04.cdf")

    # variable_names = cdf_file.cdf_info().rVariables
    # # data = {var: cdf_file.varget(var) for var in variable_names}

    # print(variable_names)

    if _log_progress:
        log(
            json.dumps(
                {
                    "event": "import_data_progress",
                    "data": {
                        "start_date": start_date,
                        "end_date": end_date,
                        "vars": [],
                        "probe": "DSCOVR",
                    },
                }
            )
        )

    if _log_progress:
        log(
            json.dumps(
                {
                    "event": "import_data_complete",
                    "data": {
                        "probe": "WIND",
                    },
                }
            )
        )

    if _log_progress:
        log(json.dumps({"event": "convert_to_dataframe_progress", "data": {}}))

    return
