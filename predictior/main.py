import pandas as pd
import requests
from datetime import datetime, timedelta
from enum import Enum
from data_plotter import plot_imported_data, DEFAULT_PLOTTED_COLUMNS
import json
from utils.log import log
import argparse

base_url = "https://services.swpc.noaa.gov/text/rtsw/data/"

durations = [
    {"name": "5 minutes", "duration": timedelta(minutes=5)},
    {"name": "2 hours", "duration": timedelta(hours=2)},
    {"name": "6 hours", "duration": timedelta(hours=6)},
    {"name": "1 day", "duration": timedelta(days=1)},
    {"name": "3 days", "duration": timedelta(days=3)},
    {"name": "7 days", "duration": timedelta(days=7)},
    {"name": "30 days", "duration": timedelta(days=30)},
    {"name": "54 days", "duration": timedelta(days=54)},
    {"name": "1 year", "duration": timedelta(days=365)},
    {"name": "5 years", "duration": timedelta(days=365 * 5)},
    {"name": "All", "duration": timedelta(days=365 * 30)},
]

mag_columns = set(
    [
        "bt_min",
        "bt_max",
        "bt",
        "bx_gsm",
        "by_gsm",
        "bz_gsm",
        "bx_gsm_min",
        "bx_gsm_max",
        "by_gsm_min",
        "by_gsm_max",
        "bz_gsm_min",
        "bz_gsm_max",
        "lat_gsm_min",
        "lat_gsm_max",
        "lat_gsm",
        "lon_gsm",
        "lon_gsm_min",
        "lon_gsm_max",
        "quality",
        "source",
        "active",
    ]
)

kp_columns = set(["kp", "ap", "ap_daily", "source"])

plasma_columns = set(
    [
        "speed_min",
        "speed_max",
        "speed",
        "density_min",
        "density_max",
        "density",
        "temperature_min",
        "temperature_max",
        "temperature",
        "quality",
        "source",
        "active",
    ]
)

ssn_columns = set(["ssn"])
flux_10_7_columns = set(["f10.7"])


class DurationEnum(Enum):
    minutes5 = "5min"
    hours2 = "2 hours"
    hours6 = "6 hours"
    day = "1 day"
    days3 = "3 days"
    days7 = "7 days"
    days30 = "30 days"
    days54 = "54 days"
    year = "1 year"
    years5 = "5 years"
    all = "All"


def get_time_path(duration: DurationEnum):
    if duration == DurationEnum.minutes5 or duration == DurationEnum.minutes5.value:
        return "-1-day-5-minute.json"
    if duration == DurationEnum.hours2 or duration == DurationEnum.hours2.value:
        return "-2-hour.i.json"
    elif duration == DurationEnum.hours6 or duration == DurationEnum.hours6.value:
        return "-6-hour.i.json"
    elif duration == DurationEnum.day or duration == DurationEnum.day.value:
        return "-1-day.i.json"
    elif duration == DurationEnum.days3 or duration == DurationEnum.days3.value:
        return "-3-day.i.json"
    elif duration == DurationEnum.days7 or duration == DurationEnum.days7.value:
        return "-7-day.i.json"
    elif duration == DurationEnum.days30 or duration == DurationEnum.days30.value:
        return "-30-day.i.json"
    elif duration == DurationEnum.days54 or duration == DurationEnum.days54.value:
        return "-54-day.i.json"
    elif duration == DurationEnum.year or duration == DurationEnum.year.value:
        return "-1-year.i.json"
    elif duration == DurationEnum.years5 or duration == DurationEnum.years5.value:
        return "-5-year.i.json"
    elif duration == DurationEnum.all or duration == DurationEnum.all.value:
        return "-30-year.i.json"


def get_kp_path(duration: DurationEnum):
    return base_url + "kp" + get_time_path(duration)


def get_mag_path(duration: DurationEnum):
    return base_url + "mag" + get_time_path(duration)


def get_plasma_path(duration: DurationEnum):
    return base_url + "plasma" + get_time_path(duration)


def convert_to_df(data: any) -> pd.DataFrame:
    index = map(lambda x: datetime.fromisoformat(x[0]), data[1:])
    d = list(map(lambda x: x[1:], data[1:]))
    df = pd.DataFrame(data=d, columns=data[0][1:], index=index)
    for column in df.columns:
        df[column] = pd.to_numeric(df[column], errors="coerce")
    return df


def get_sunspot_df():
    results = requests.get(
        url="https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json"
    ).json()
    indexes = list(map(lambda x: datetime.strptime(x["time-tag"], "%Y-%m"), results))
    columns = ["ssn"]
    values = list(map(lambda x: [x["ssn"]], results))
    return pd.DataFrame(data=values, columns=columns, index=indexes)


def get_flux_10_7_df():
    results = requests.get(
        url="https://services.swpc.noaa.gov/json/solar-cycle/f10-7cm-flux.json"
    ).json()
    indexes = list(map(lambda x: datetime.strptime(x["time-tag"], "%Y-%m"), results))
    columns = ["f10.7"]
    values = list(map(lambda x: [x["f10.7"]], results))
    return pd.DataFrame(data=values, columns=columns, index=indexes)


def get_sunspot_df():
    results = requests.get(
        url="https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json"
    ).json()
    indexes = list(map(lambda x: datetime.strptime(x["time-tag"], "%Y-%m"), results))
    columns = ["ssn"]
    values = list(map(lambda x: [float(x["ssn"])], results))
    # print(values)
    return pd.DataFrame(data=values, columns=columns, index=indexes)


def main(duration: DurationEnum):
    duration_str = duration
    if isinstance(duration, DurationEnum):
        duration_str = duration.value

    log(json.dumps({"event": "importing_data", "data": {"duration": duration_str}}))
    mag_data = requests.get(get_mag_path(duration)).json()
    plasma_data = requests.get(get_plasma_path(duration)).json()
    kp_data = requests.get(get_kp_path(duration)).json()

    log(json.dumps({"event": "converting_to_dataframe", "data": {}}))

    mag_df = convert_to_df(mag_data)
    plasma_df = convert_to_df(plasma_data)
    kp_df = convert_to_df(kp_data)
    ssn_df = get_sunspot_df()
    flux_10_7_df = get_flux_10_7_df()

    # merged_data: pd.DataFrame = pd.concat(
    #     [mag_df, plasma_df, kp_df], ignore_index=False
    # )

    delta_time = list(filter(lambda x: x["name"] == duration_str, durations))[0][
        "duration"
    ]

    log(json.dumps({"event": "finished", "data": {}}))

    return dict(
        {
            "duration": duration_str,
            "duration_timedelta": delta_time,
            #
            "mag_df": mag_df,
            "plasma_df": plasma_df,
            "kp_df": kp_df,
            "ssn_df": ssn_df,
            "flux_10_7_df": flux_10_7_df
            # "dataframe": merged_data
            #
        }
    )
    # print(mag_df)


def parameter_to_request(params: list[str | list[str]], data: dict[pd.DataFrame]):
    results = []
    for i in range(len(params)):
        param = params[i]
        if isinstance(param, str):
            param = [params[i]]
        if set(param).issubset(mag_columns):
            results.append(dict({"data": data["mag_df"], "columns_to_plot": param}))
        elif set(param).issubset(plasma_columns):
            results.append(dict({"data": data["plasma_df"], "columns_to_plot": param}))
        elif set(param).issubset(kp_columns):
            results.append(dict({"data": data["kp_df"], "columns_to_plot": param}))
        elif set(param).issubset(ssn_columns):
            results.append(dict({"data": data["ssn_df"], "columns_to_plot": param}))
        elif set(param).issubset(flux_10_7_columns):
            results.append(
                dict({"data": data["flux_10_7_df"], "columns_to_plot": param})
            )
    return results


def get_scales_data():
    return requests.get(
        url="https://services.swpc.noaa.gov/products/noaa-scales.json"
    ).json()


def get_solar_cycle_data():
    results = requests.get(
        url="https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle-indices.json"
    ).json()
    return results[len(results) - 1]


def get_10cm_flux():
    #
    results = requests.get(
        url="https://services.swpc.noaa.gov/products/summary/10cm-flux.json"
    ).json()
    return {"f10.7": results["Flux"]}


def data_to_dict(data: list[list[str]]):
    result = {}
    columns = data[0]
    last_update = data[len(data) - 1]
    for i in range(len(columns)):
        result[columns[i]] = last_update[i]
    return result


def get_current_data():
    mag_data = requests.get(get_mag_path(DurationEnum.minutes5)).json()
    plasma_data = requests.get(get_plasma_path(DurationEnum.minutes5)).json()
    kp_data = requests.get(get_kp_path(DurationEnum.minutes5)).json()
    solar_cycle_data = get_solar_cycle_data()
    # merge dicts
    return {
        **data_to_dict(kp_data),
        **data_to_dict(plasma_data),
        **data_to_dict(mag_data),
        **solar_cycle_data,
        **get_10cm_flux(),
    }


parser = argparse.ArgumentParser()
parser.add_argument(
    "--duration",
    dest="duration",
    type=str,
    help="Add the duration to get the prediction based on it",
)
args = parser.parse_args()

if __name__ == "__main__":
    duration = args.duration or DurationEnum.days3

    data = main(duration)
    columns_to_plot = DEFAULT_PLOTTED_COLUMNS
    # plot_request = parameters_to_request(columns_to_plot, data)

    (img, show_plot, close_plot) = plot_imported_data(
        data=parameter_to_request(columns_to_plot, data),
        duration=data["duration_timedelta"],
    )
    log(json.dumps({"event": "plot_img_approved", "data": {"img": img}}))
    while True:
        i = input()

        try:
            cmd_payload: dict = json.loads(i)
            cmd = cmd_payload.get("cmd")
            if cmd == "eval":
                exec(cmd_payload.get("data"))
            elif cmd == "get_current_data":
                log(
                    json.dumps(
                        {"event": "current_data_result", "data": get_current_data()}
                    )
                )
            elif cmd == "get_scales_data":
                log(json.dumps({"event": "scales_result", "data": get_scales_data()}))
            elif cmd == "request_plot_img":
                columns_to_plot = cmd_payload.get("data") or DEFAULT_PLOTTED_COLUMNS
                # plot_request = parameters_to_request(columns_to_plot, data)
                (img, show_plot, close_plot) = plot_imported_data(
                    data=parameter_to_request(columns_to_plot, data),
                    duration=data["duration_timedelta"],
                )
                log(json.dumps({"event": "plot_img_approved", "data": {"img": img}}))
            elif cmd == "plot":
                (img, show_plot, close_plot) = plot_imported_data(
                    data=parameter_to_request(columns_to_plot, data),
                    duration=data["duration_timedelta"],
                )
                show_plot()
                log(json.dumps({"event": "plot_approved"}))
            elif cmd == "exit":
                break
            else:
                log(json.dumps({"event": "error", "data": "Unknown command"}))
        except Exception as e:
            print(e)
            log(json.dumps({"event": "error", "data": "Something went wrong"}))
