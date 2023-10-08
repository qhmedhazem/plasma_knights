import argparse
import json
import pandas as pd
import warnings
from datetime import timedelta, datetime
from utils.get_times import get_times

from data.import_data import import_data
from plots.data_plotter import plot_imported_data
from tests.coordinates.coordinates_tests import find_reconnection_list_xyz
from tests.lmn.lmn_tests import lmn_testing
from utils.flatten_list import flatten_list
from utils.log import log

warnings.filterwarnings("ignore")


def get_events(start_date: str, end_date: str, duration: int, _probe="WIND"):
    possible_events: list[datetime] = []

    if _probe is None:
        return log(json.dumps({"event": "error", "data": "No probe specified"}))

    log(
        json.dumps(
            {
                "event": "importing_data",
                "data": {
                    "start_date": start_date,
                    "end_date": end_date,
                    "duration": duration,
                    "probe": _probe or "",
                },
            }
        )
    )

    times = get_times(
        start_date_str=start_date, end_date_str=end_date, duration_in_hours=duration
    )
    imported_data: list[pd.DataFrame] = import_data(
        times=times, _probe=_probe, _log_progress=True
    )

    for n in range(len(imported_data)):
        log(
            json.dumps(
                {
                    "event": "coordinates_test_progress",
                    "data": {"current": n + 1, "total": len(imported_data)},
                }
            )
        )
        data = imported_data[n]
        reconnection_events = find_reconnection_list_xyz(data)
        if reconnection_events:
            for event in reconnection_events:
                possible_events.append(event)

    log(
        json.dumps(
            {
                "event": "coordinates_test_finished",
                "data": {
                    "total": len(imported_data),
                    "possible_events": len(possible_events),
                },
            }
        )
    )

    lmn_approved_events: list[datetime] = []
    duration = 24
    for n in range(len(possible_events)):
        event = possible_events[n]
        log(
            json.dumps(
                {
                    "event": "lmn_test_progress",
                    "data": {"current": n + 1, "total": len(possible_events)},
                }
            )
        )

        before_hours_of_event = event - timedelta(hours=duration / 2)
        before_2_hours_of_event = event - timedelta(hours=2)
        after_hours_of_event = event + timedelta(hours=duration / 2)
        after_2_hours_of_event = event + timedelta(hours=2)
        data = import_data(times=[[before_hours_of_event, after_hours_of_event]])
        if data is None or len(data) == 0:
            log(
                json.dumps(
                    {
                        "event": "error",
                        "data": f"No data found for the event: {event.isoformat()}",
                    }
                )
            )
            continue
        data = data[0]
        data = data[before_2_hours_of_event:after_2_hours_of_event]

        if lmn_testing(data, event):
            lmn_approved_events.append(event)

    tests_result = {
        "coordinates_tests": {
            "count": len(possible_events),
            "data": list(
                map(
                    lambda x: x.isoformat(),
                    possible_events,
                )
            ),
        },
        "lmn_tests": {
            "count": len(lmn_approved_events),
            "data": list(
                map(
                    lambda x: x.isoformat(),
                    lmn_approved_events,
                )
            ),
        },
    }

    log(
        json.dumps(
            {
                "event": "finished",
                "data": tests_result,
            }
        )
    )

    merged_data: pd.DataFrame = pd.concat(imported_data, ignore_index=False).fillna(
        0, inplace=False
    )

    # skip_every = 11
    # indexes = [i.strftime("%Y-%m-%d %I:%M %p") for i in merged_data.index]
    # paramaters_result = [
    #     {
    #         "name": "index",
    #         "values": [indexes[i] for i in range(10, len(indexes), skip_every)],
    #     }
    # ]

    # for paramater in merged_data.columns.tolist():
    #     para_list = merged_data[paramater].values.tolist()
    #     paramaters_result.append(
    #         {
    #             "name": paramater,
    #             "values": [para_list[i] for i in range(10, len(para_list), skip_every)],
    #         }
    #     )

    # log(
    #     json.dumps(
    #         {
    #             "event": "paramaters",
    #             "data": paramaters_result,
    #         }
    #     )
    # )

    return dict(
        {
            "imported_data": merged_data,
            "start_date": times[0][0],
            "end_date": times[len(times) - 1][1],
            # "paramaters": paramaters_result,
            "results": tests_result,
        }
    )


parser = argparse.ArgumentParser()
parser.add_argument(
    "--start_date",
    dest="start_date",
    type=str,
    help="Add the start date to get the data in range of dates",
)
parser.add_argument(
    "--end_date",
    dest="end_date",
    type=str,
    help="Add the start date to get the data in range of dates",
)
parser.add_argument(
    "--probe",
    dest="probe",
    type=str,
    help="Select Probe From [ACE, WIND, DSCOVR]",
)
args = parser.parse_args()


if __name__ == "__main__":
    start = args.start_date or "2000-01-01"
    end = args.end_date or "2000-01-02"
    probe = args.probe or "WIND"

    print(start, end, probe)
    saved_data = get_events(
        start_date=start,
        end_date=end,
        duration=24,
        _probe=probe,
    )

    while True:
        i = input()

        try:
            cmd_payload: dict = json.loads(i)
            cmd = cmd_payload.get("cmd")
            # if cmd == "paramaters":
            #     log(
            #         json.dumps(
            #             {"event": "paramaters", "data": saved_data["paramaters"]}
            #         )
            #     )
            if cmd == "plot":
                plot_imported_data(
                    saved_data["imported_data"],
                    start_date=saved_data["start_date"],
                    end_date=saved_data["end_date"],
                    probe=probe,
                )
                log(json.dumps({"event": "plot_approved"}))
            elif cmd == "exit":
                break
            else:
                log(json.dumps({"event": "error", "data": "Unknown command"}))
        except Exception as e:
            print(e)
            log(json.dumps({"event": "error", "data": "Something went wrong"}))
