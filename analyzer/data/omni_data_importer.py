from enum import Enum
import requests
import os
import datetime
from datetime import timedelta
import pandas as pd
import numpy as np
import json
from utils.log import log

base_url = "https://spdf.gsfc.nasa.gov/pub/data/omni/high_res_omni/"
int_parameters = ["year", "day", "hour", "minute"]

# parameters = [
#     "year",
#     "day",
#     "hour",
#     "minute",
#     "sc_id",
#     "sw_plasma_sc_id",
#     "interp_precent",
#     "timeshift",
#     "rms_timeshift",
#     "rms_phase_front_normal",
#     "time_btwn_observations",
#     "Bt",
#     "Bx_gse_gsm",
#     "By_gse",
#     "Bz_gse",
#     "By_gsm",
#     "Bz_gsm",
#     "rms_sd_b_scalar",
#     "rms_sd_field_vector",
#     "flow_speed",
#     "Vx_gse",
#     "Vy_gse",
#     "Vz_gse",
#     "proton_density",
#     "temperature",
#     "flow_pressure",
#     "electric_field",
#     "plasma_beta",
#     "alfven_mach_number",
#     "x_gse_re",
#     "y_gse_re",
#     "z_gse_re",
#     "bsn_location_x_gse_re",
#     "bsn_location_y_gse_re",
#     "bsn_location_z_gse_re",
#     "ae_index",
#     "al_index",
#     "au_index",
#     "sym_d_index",
#     "sym_h_index",
#     "asy_d_index",
#     "asy_h_index",
#     "pc_n_index",
#     "magnetosonic_mach_number",
# ]

parameters = [
    "year",
    "day",
    "hour",
    "minute",
    "imf_spacecraft_id",
    "sw_plasma_spacecraft_id",
    "averages_points_in_imf",  # of points in IMF averages
    "averages_points_in_plasma",  # of points in Plasma averages
    "percent_interp",
    "timeshift_sec",
    "rms_timeshift_sec",
    "rms_phase_front_normal",
    "time_btwn_observations_sec",
    "field_magnitude_avg_nt",
    "bx_nt_gse_gsm",
    "by_nt_gse",
    "bz_nt_gse",
    "by_nt_gsm",
    "bz_nt_gsm",
    "rms_sd_b_scalar_nt",
    "rms_sd_field_vector_nt",
    "flow_speed_km_s",
    "vx_velocity_km_s_gse",
    "vy_velocity_km_s_gse",
    "vz_velocity_km_s_gse",
    "proton_density_n_cc",
    "temperature_k",
    "flow_pressure_npa",
    "electric_field_mv_m",
    "plasma_beta",
    "alfven_mach_number",
    "x_sc_gse_re",
    "y_sc_gse_re",
    "z_sc_gse_re",
    "bsn_location_x_gse_re",
    "bsn_location_y_gse_re",
    "bsn_location_z_gse_re",
    "ae_index_nt",
    "al_index_nt",
    "au_index_nt",
    "sym_d_index_nt",
    "sym_h_index_nt",
    "asy_d_index_nt",
    "asy_h_index_nt",
    "pc_n_index",
    "magnetosonic_mach_number",
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

data_ranges = (1981, None)


class DataImporter:
    def __init__(
        self,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
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
        self.log_progress_state = log_progress_state

    def parse_omni_url(self, year: int):
        return base_url + f"omni_min{year}.asc"

    def download_data(
        self,
    ):
        max_year, min_year = data_ranges

        if self.log_progress_state:
            log(
                json.dumps(
                    {
                        "event": "import_data_progress",
                        "data": {
                            "years": list(range(self.start_year, self.end_year + 1)),
                            "start_year": self.start_year,
                            "end_year": self.end_year,
                        },
                    }
                )
            )
        isDirExists = os.path.exists(f"./cache/")
        if not isDirExists:
            os.mkdir(f"./cache/")

        for year in range(self.start_year, self.end_year + 1):
            isExists = os.path.exists(f"./cache/omni_{year}.asc")

            if isExists:
                # print(f"File {probe}_{year}.asc already exists")
                continue

            url = self.parse_omni_url(year)
            # print(f"Downloading omni data for {year} ({url})")

            stream_request = requests.get(url=url, stream=True)
            with open(f"./cache/omni_{year}.asc", "wb") as fd:
                for chunk in stream_request.iter_content(chunk_size=128):
                    fd.write(chunk)

            # print(f"Saved omni data for {year} in ./cache/omni_{year}.asc")

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
            # print(len(line), len(parameters))

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
                            # "probe": self.probe,
                        },
                    }
                )
            )

        files = [
            f"./cache/omni_{year}.asc"
            for year in range(self.start_year, self.end_year + 1)
        ]

        final_data = pd.DataFrame()
        if self.log_progress_state:
            log(json.dumps({"event": "convert_to_dataframe_progress", "data": {}}))

        for file in files:
            for index, data in self.get_data_from_file(
                file, self.importing_start_date, self.importing_end_date
            ):
                if data is None:
                    continue
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

                final_data.loc[index, "By_gsm"] = data["by_nt_gsm"]
                final_data.loc[index, "Bz_gsm"] = data["bz_nt_gsm"]
                final_data.loc[index, "flow_pressure"] = data["flow_pressure_npa"]
                final_data.loc[index, "alfven_mach_number"] = data["alfven_mach_number"]
                final_data.loc[index, "flow_speed"] = data["flow_speed_km_s"]
                final_data.loc[index, "alfven_mach_number"] = data["alfven_mach_number"]
        self.cache = final_data

        return final_data[self.start_date : self.end_date]
