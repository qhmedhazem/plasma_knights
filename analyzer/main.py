import argparse
import json
import pandas as pd
import warnings
from datetime import timedelta, datetime

from utils.get_times import get_times
from data.import_data import import_data
from plots.data_plotter import plot_imported_data, DEFAULT_PLOTTED_COLUMNS
from tests.coordinates.coordinates_tests import find_reconnection_list_xyz
from tests.lmn.lmn_tests import lmn_testing
from utils.flatten_list import flatten_list
from utils.log import log
from utils.convert_to_lmn import change_coordinates_to_lmn

warnings.filterwarnings("ignore")

events_plot_divided_count = 24


def get_events(start_date: str, end_date: str, duration: int):
    possible_events: list[datetime] = []

    log(
        json.dumps(
            {
                "event": "importing_data",
                "data": {
                    "start_date": start_date,
                    "end_date": end_date,
                    "duration": duration,
                    # "probe": probe or "",
                },
            }
        )
    )

    times: list[list[datetime]] = get_times(
        start_date_str=start_date, end_date_str=end_date, duration_in_hours=duration
    )
    imported_data, data_importer = import_data(times=times, _log_progress=True)

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

        # before_hours_of_event = event - timedelta(hours=duration / 2)
        before_2_hours_of_event = event - timedelta(hours=2)
        # after_hours_of_event = event + timedelta(hours=duration / 2)
        after_2_hours_of_event = event + timedelta(hours=2)
        data = data_importer.import_data(
            start_date=before_2_hours_of_event, end_date=after_2_hours_of_event
        )
        if data is None:  # or len(data) == 0
            log(
                json.dumps(
                    {
                        "event": "error",
                        "data": f"No data found for the event: {event.isoformat()}",
                    }
                )
            )
            continue
        # data = data[0]
        # data = data[before_2_hours_of_event:after_2_hours_of_event]
        lmn_test_result = lmn_testing(data, event)
        if lmn_test_result is not None and lmn_test_result["status"] == True:
            lmn_approved_events.append(
                dict({"event": event, "data": lmn_test_result["data"]})
            )

    merged_data: pd.DataFrame = pd.concat(imported_data, ignore_index=False)

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
                    lambda x: x["event"].isoformat(),
                    lmn_approved_events,
                )
            ),
        },
    }

    merged_data["possible_events"] = 0
    merged_data["lmn_approved_events"] = 0

    for i in range(len(possible_events)):
        index = possible_events[i]
        merged_data.loc[index, "possible_events"] = 1

    for i in range(len(lmn_approved_events)):
        index = lmn_approved_events[i]["event"]
        merged_data.loc[index, "lmn_approved_events"] = 1

    # L, M, N = hybrid_mva(
    #     data,
    #     event_date,
    #     outside_interval=outside_interval,
    #     inside_interval=inside_interval,
    #     mva_interval=mva_interval,
    # )

    # change_coordinates_to_lmn(merged_data)

    duration: timedelta = times[len(times) - 1][1] - times[0][0]
    skip_every = duration / events_plot_divided_count
    possible_events_per_duration = pd.DataFrame()

    for i in range(events_plot_divided_count):
        start = times[0][0] + (skip_every * i)
        end = start + skip_every
        possible_events_per_duration.loc[start, "possible_events_sum"] = merged_data[
            start:end
        ]["possible_events"].sum()
        possible_events_per_duration.loc[
            start, "lmn_approved_events_sum"
        ] = merged_data[start:end]["lmn_approved_events"].sum()

    log(
        json.dumps(
            {
                "event": "finished",
                "data": tests_result,
            }
        )
    )

    # for i in range(len(possible_events)):
    #     merged_data.loc[possible_events[i], "possible_events"] = 1

    # for i in range(len(lmn_approved_events)):
    #     merged_data.loc[lmn_approved_events[i], "lmn_approved_events"] = 1

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
            "possible_events_per_duration": possible_events_per_duration,
            "start_date": times[0][0],
            "end_date": times[len(times) - 1][1],
            "lmn_approved_events": lmn_approved_events,
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
args = parser.parse_args()


if __name__ == "__main__":
    start = args.start_date or "2015-01-02"
    end = args.end_date or "2015-01-03"

    # print(start, end, probe)
    saved_data = get_events(
        start_date=start,
        end_date=end,
        duration=24,
    )

    columns_to_plot = DEFAULT_PLOTTED_COLUMNS
    data = saved_data["imported_data"]
    if "possible_events_sum" in columns_to_plot:
        data = saved_data["possible_events_per_duration"]

    title = f""
    imported_data = data
    start_date = saved_data["start_date"]
    end_date = saved_data["end_date"]
    columns_to_plot = columns_to_plot
    event_date = None

    (img, show_plot, close_plot) = plot_imported_data(
        imported_data=imported_data,
        start_date=start_date,
        end_date=end_date,
    )
    log(json.dumps({"event": "plot_img_approved", "data": {"img": img}}))

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
            if cmd == "eval":
                exec(cmd_payload.get("data"))
            if cmd == "request_plot_img":
                columns_to_plot = cmd_payload.get("data") or DEFAULT_PLOTTED_COLUMNS
                data = saved_data["imported_data"]
                if "possible_events_sum" in columns_to_plot:
                    data = saved_data["possible_events_per_duration"]

                title = ""
                imported_data = data
                start_date = saved_data["start_date"]
                end_date = saved_data["end_date"]
                columns_to_plot = columns_to_plot
                event_date = None

                (img, show_plot, close_plot) = plot_imported_data(
                    title=title,
                    imported_data=imported_data,
                    start_date=start_date,
                    end_date=end_date,
                    columns_to_plot=columns_to_plot,
                    event_date=event_date,
                )
                log(json.dumps({"event": "plot_img_approved", "data": {"img": img}}))
            if cmd == "get_lmn_plot_data":
                # print(saved_data["lmn_tests_data"])
                query = cmd_payload.get("data")
                columns = query["columns"]
                index = query["index"]
                event_date: datetime = saved_data["lmn_approved_events"][index]["event"]
                data_to_plot = saved_data["lmn_approved_events"][index]["data"]

                title = f"Approved Event: {event_date.strftime('%d/%m/%Y %I:%M:%S %p')}"
                imported_data = data_to_plot
                start_date = data_to_plot.index[0]
                end_date = data_to_plot.index[-1]
                columns_to_plot = columns
                event_date = event_date

                (img, show_plot, close_plot) = plot_imported_data(
                    title=title,
                    imported_data=imported_data,
                    start_date=start_date,
                    end_date=end_date,
                    columns_to_plot=columns_to_plot,
                    event_date=event_date,
                )
                log(json.dumps({"event": "plot_img_approved", "data": {"img": img}}))
            if cmd == "show_plot":
                try:
                    show_plot()
                except Exception as e:
                    log(json.dumps({"event": "error", "data": "No plot to show"}))
            if cmd == "plot":
                data = saved_data["imported_data"]
                if "possible_events_sum" in columns_to_plot:
                    data = saved_data["possible_events_per_duration"]

                (img, show_plot, close_plot) = plot_imported_data(
                    title=title,
                    imported_data=imported_data,
                    start_date=start_date,
                    end_date=end_date,
                    columns_to_plot=columns_to_plot,
                    event_date=event_date,
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
