from cdasws import CdasWs
import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta

from utils.log import log


def wind(start_date: str, end_date: str, _log_progress: bool = False):
    cdas = CdasWs()
    vars = [
        "Proton_VX_nonlin",
        "Proton_VY_nonlin",
        "Proton_VZ_nonlin",
        "Proton_Np_nonlin",
        "xgse",
        "ygse",
        "zgse",
        "BX",
        "BY",
        "BZ",
    ]

    if _log_progress:
        log(
            json.dumps(
                {
                    "event": "import_data_progress",
                    "data": {
                        "start_date": start_date,
                        "end_date": end_date,
                        "vars": vars,
                        "probe": "WIND",
                    },
                }
            )
        )

    status, data = cdas.get_data("WI_H1_SWE", vars, start_date, end_date)

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

    data: pd.DataFrame = data.to_dataframe()
    indices = [pd.Timestamp(index).to_pydatetime() for index in data.index.values]

    final_data = pd.DataFrame(index=indices)

    iteration = 0
    for index in indices:
        final_data.loc[index, "vp_x"] = data.loc[index, "Proton_VX_nonlin"]
        final_data.loc[index, "vp_y"] = data.loc[index, "Proton_VY_nonlin"]
        final_data.loc[index, "vp_z"] = data.loc[index, "Proton_VZ_nonlin"]

        final_data.loc[index, "n_p"] = data.loc[index, "Proton_Np_nonlin"]
        final_data.loc[index, "r_sun"] = (
            # represents the distance from the center of the Sun to the point specified by the coordinates (xgse, ygse, zgse) in units of solar radii.
            1
            - np.sqrt(
                data.loc[index, "xgse"] ** 2
                + data.loc[index, "ygse"] ** 2
                + data.loc[index, "zgse"] ** 2
            )
            * 4.26354e-5
        )  # convert earth radius to au, 1- because distance initially from earth
        final_data.loc[index, "Bx"] = data.loc[index, "BX"]
        final_data.loc[index, "By"] = data.loc[index, "BY"]
        final_data.loc[index, "Bz"] = data.loc[index, "BZ"]

        iteration += 1

    return final_data
