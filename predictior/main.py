import pandas as pd
import numpy as np
import requests
from datetime import datetime, timedelta
from enum import Enum
from data_plotter import plot_imported_data


base_url = "https://services.swpc.noaa.gov/text/rtsw/data/"

durations = [
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


class DurationEnum(Enum):
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
    if duration == DurationEnum.hours2:
        return "-2-hour.i.json"
    elif duration == DurationEnum.hours6:
        return "-6-hour.i.json"
    elif duration == DurationEnum.day:
        return "-1-day.i.json"
    elif duration == DurationEnum.days3:
        return "-3-day.i.json"
    elif duration == DurationEnum.days7:
        return "-7-day.i.json"
    elif duration == DurationEnum.days30:
        return "-30-day.i.json"
    elif duration == DurationEnum.days54:
        return "-54-day.i.json"
    elif duration == DurationEnum.year:
        return "-1-year.i.json"
    elif duration == DurationEnum.years5:
        return "-5-year.i.json"
    elif duration == DurationEnum.all:
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
    return df


def main(duration: DurationEnum):
    mag_data = requests.get(get_mag_path(duration)).json()
    plasma_data = requests.get(get_plasma_path(duration)).json()
    kb_data = requests.get(get_kp_path(duration)).json()

    mag_df = convert_to_df(mag_data)
    plasma_df = convert_to_df(plasma_data)
    kb_df = convert_to_df(kb_data)

    print(kb_df["kp"])

    plot_imported_data(
        [
            # {"name": "Magnetic Field Data", "df": mag_data},
            # {"name": "Plasma Data", "df": plasma_data},
            {"name": "Kp Data", "df": kb_df["kp"]},
        ],
        timedelta(days=30),
    )
    # print(mag_df)


if __name__ == "__main__":
    main(DurationEnum.days30)
