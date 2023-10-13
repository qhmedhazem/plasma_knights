from enum import Enum
import requests
import os
import datetime
from datetime import timedelta
import pandas as pd
import numpy as np
import json
from utils.log import log

base_url = "https://spdf.gsfc.nasa.gov/pub/data/omni/high_res_omni/sc_specific/"
int_parameters = ["year", "day", "hour", "minute"]

parameters = [
    "year",
    "day",
    "hour",
    "minute",
    "num_points_imf_avg",
    "percent_interp",
    "cp_mv_flag",
    "time_shift_sec",
    "phase_front_normal_x_gse",
    "phase_front_normal_y_gse",
    "phase_front_normal_z_gse",
    "scalar_b_nt",
    "bx_nt_gse_gsm",
    "by_nt_gse",
    "bz_nt_gse",
    "by_nt_gsm",
    "bz_nt_gsm",
    "rms_timeshift_sec",
    "rms_phase_front_normal",
    "rms_scalar_b_nt",
    "rms_field_vector_nt",
    "num_points_plasma_avg",
    "flow_speed_km_s",
    "vx_velocity_km_s_gse",
    "vy_velocity_km_s_gse",
    "vz_velocity_km_s_gse",
    "proton_density_n_cc",
    "temperature_k",
    "x_sc_gse_re",
    "y_sc_gse_re",
    "z_sc_gse_re",
    "x_target_gse_re",
    "y_target_gse_re",
    "z_target_gse_re",
    "rms_target_re",
    "dbot1_sec",
    "dbot2_sec",
]

invaild_values = [
    "999",
    "9.9",
    "999999",
    "99.99",
    "9999.99",
    "99999.9",
    "999.99",
    "9999999.",
]

data_ranges = {
    "ACE": (1998, 2021),
    "WIND": (1995, None),
    "DSCOVR": (2016, 2019),
    "GEOTAIL": (1995, 2006),
    "IMP8": (1973, 2000),
}


class OmniProbes(Enum):
    WIND = "WIND"
    ACE = "ACE"
    DSCOVR = "DSCOVR"
    GEOTAIL = "GEOTAIL"
    IMP8 = "IMP8"


class DataImporter:
    def __init__(
        self,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
        probe: OmniProbes,
        duration: int = 4,
        log_progress_state: bool = False,
    ):
        self.importing_start_date = start_date - timedelta(hours=2)
        self.importing_end_date = end_date + timedelta(hours=2)
        self.start_date = start_date
        self.end_date = end_date
        self.start_year = self.importing_start_date.year
        self.end_year = self.importing_end_date.year
        self.cache = None
        self.duration = duration
        self.probe = probe or OmniProbes.WIND
        self.log_progress_state = log_progress_state

    def parse_omni_url(self, probe: OmniProbes, year: int):
        if probe == "ACE":
            return base_url + f"ace_min_b{year}.txt"
        elif probe == "WIND":
            return base_url + f"wind_min_b{year}.txt"
        elif probe == "DSCOVR":
            return base_url + f"dscovr_min_b{year}.txt"
        elif probe == "GEOTAIL":
            return base_url + f"geotail_min_b{year}.txt"
        elif probe == "IMP8":
            return base_url + f"imp8_min_b{year}.txt"
        else:
            return None

    def download_data(
        self,
    ):
        max_year, min_year = data_ranges[self.probe]

        if self.log_progress_state:
            log(
                json.dumps(
                    {
                        "event": "import_data_progress",
                        "data": {
                            "years": list(range(self.start_year, self.end_year + 1)),
                            "start_year": self.start_year,
                            "end_year": self.end_year,
                            "probe": self.probe,
                        },
                    }
                )
            )

        for year in range(self.start_year, self.end_year + 1):
            isExists = os.path.exists(f"./data/cache/{self.probe}_{year}.txt")
            if isExists:
                # print(f"File {probe}_{year}.txt already exists")
                continue

            url = self.parse_omni_url(self.probe, year)
            print(f"Downloading {self.probe} data for {year} ({url})")

            stream_request = requests.get(url=url, stream=True)
            with open(f"./data/cache/{self.probe}_{year}.txt", "wb") as fd:
                for chunk in stream_request.iter_content(chunk_size=128):
                    fd.write(chunk)

            print(
                f"Saved {self.probe} data for {year} in ./data/cache/{self.probe}_{year}.txt"
            )

        return True

    def parse_param(self, param: str) -> float:
        if param in invaild_values:
            return np.nan
        return float(param)

    def get_data_from_file(
        self, pathname: str, start_date: datetime.datetime, end_date: datetime.datetime
    ):
        cur = open(pathname, "r")
        for line in cur:
            line = line.split()
            year = int(line[0])
            day = int(line[1])
            hour = int(line[2])
            minute = int(line[3])
            data = {
                parameter: self.parse_param(line[i])
                for i, parameter in enumerate(parameters)
                if parameter not in int_parameters
            }
            date = datetime.datetime(year, 1, 1) + datetime.timedelta(day - 1)
            date = date + datetime.timedelta(hours=hour, minutes=minute)
            if date >= start_date and date <= end_date:
                yield (date, data)

    def import_data(
        self,
        start_date: datetime.datetime = None,
        end_date: datetime.datetime = None,
    ):
        if self.cache is not None:
            return self.cache[start_date or self.start_date : end_date or self.end_date]

        self.download_data()
        if self.log_progress_state:
            log(
                json.dumps(
                    {
                        "event": "import_data_complete",
                        "data": {
                            "probe": self.probe,
                        },
                    }
                )
            )

        files = [
            f"./data/cache/{self.probe}_{year}.txt"
            for year in range(self.start_year, self.end_year + 1)
        ]

        final_data = pd.DataFrame()
        if self.log_progress_state:
            log(json.dumps({"event": "convert_to_dataframe_progress", "data": {}}))

        for file in files:
            for index, data in self.get_data_from_file(
                file, self.importing_start_date, self.importing_end_date
            ):
                final_data.loc[index, "vp_x"] = data["vx_velocity_km_s_gse"]
                final_data.loc[index, "vp_y"] = data["vy_velocity_km_s_gse"]
                final_data.loc[index, "vp_z"] = data["vz_velocity_km_s_gse"]
                final_data.loc[index, "n_p"] = data["proton_density_n_cc"]
                final_data.loc[index, "r_sun"] = (
                    # represents the distance from the center of the Sun to the point specified by the coordinates (xgse, ygse, zgse) in units of solar radii.
                    1
                    - np.sqrt(
                        data["x_sc_gse_re"] ** 2
                        + data["y_sc_gse_re"] ** 2
                        + data["z_sc_gse_re"] ** 2
                    )
                    * 4.26354e-5
                )  # convert earth radius to au, 1- because distance initially from earth
                final_data.loc[index, "Bx"] = data["bx_nt_gse_gsm"]
                final_data.loc[index, "By"] = data["by_nt_gse"]
                final_data.loc[index, "Bz"] = data["bz_nt_gse"]

        self.cache = final_data

        return final_data[self.start_date : self.end_date]
