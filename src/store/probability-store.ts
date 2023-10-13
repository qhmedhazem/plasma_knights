"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { usePopupStore } from "./popup-store";
import { relations } from "@/lib/analyzer";

export type Probe = "WIND" | "ACE" | "DSCOVR";
type Status = "idle" | "loading" | "success" | "error";

export interface Parameter {
  vp_x: number;
  vp_y: number;
  vp_z: number;
  n_p: number;
  r_sun: number;
  Bx: number;
  By: number;
  Bz: number;
  correlation_x: number;
  correlation_y: number;
  correlation_z: number;
  correlation_sum: number;
  correlation_diff: number;
  correlation_sum_outliers: number;
  correlation_diff_outliers: number;
}

export interface Input {
  start_date: string;
  end_date: string;
  probe: Probe;
}

export interface ResponseData {
  parameters: Parameter[];
  coordinates_tests: {
    count: number;
    data: string[];
  };
  lmn_tests: {
    count: number;
    data: string[];
  };
}

export type Message = {
  event: string;
  data: any;
};

export type EventData = Parameter[] | Message | string;

export interface Event {
  event: string;
  data: EventData;
}

export interface Parameter {
  name: string;
  values: number[];
}

interface State {
  status: Status;
  is_open: boolean;
  response: ResponseData | undefined;
  plot_img: string;
  current_relation: string;
  // paramaters: Parameter[];
  input: Input | undefined;
  current_message: string;
  events: Event[];
  setCurrentRelation: (relation: string) => void;
  setPlotImg: (img: string) => void;
  reset: () => void;
  pushEvent: (event: Event) => any;
}

// log(
//   json.dumps(
//       {
//           "event": "importing_data",
//           "data": {
//               "start_date": start_date,
//               "end_date": end_date,
//               "duration": duration,
//               # "probe": probe or "",
//           },
//       }
//   )
// )
// log(
//       json.dumps(
//           {
//               "event": "coordinates_test_progress",
//               "data": {"current": n + 1, "total": len(imported_data)},
//           }
//       )
//   )
// log(
//   json.dumps(
//       {
//           "event": "coordinates_test_finished",
//           "data": {
//               "total": len(imported_data),
//               "possible_events": len(possible_events),
//           },
//       }
//   )
// )
// log(
//       json.dumps(
//           {
//               "event": "lmn_test_progress",
//               "data": {"current": n + 1, "total": len(possible_events)},
//           }
//       )
//   )
// log(
//           json.dumps(
//               {
//                   "event": "error",
//                   "data": f"No data found for the event: {event.isoformat()}",
//               }
//           )
//       )
// log(
//   json.dumps(
//       {
//           "event": "finished",
//           "data": tests_result,
//       }
//   )
// )

// log(
//   json.dumps(
//       {
//           "event": "import_data_progress",
//           "data": {
//               "years": list(range(self.start_year, self.end_year + 1)),
//               "start_year": self.start_year,
//               "end_year": self.end_year,
//           },
//       }
//   )
// )
// log(
//   json.dumps(
//       {
//           "event": "import_data_complete",
//           "data": {
//               # "probe": self.probe,
//           },
//       }
//   )
// )
// log(json.dumps({"event": "convert_to_dataframe_progress", "data": {}}))

export const ProbabilityMessageHandler = (message: Message) => {
  const setState = useProbabilityStore.setState;
  switch (message.event) {
    case "importing_data":
      return `Importing data... - ${message.data?.start_date} - ${message.data?.end_date}`;
    case "import_data_progress":
      return `Importing data... - ${message.data?.start_year} - ${message.data?.end_year}`;
    case "import_data_complete":
      return "Importing data... - Complete";
    case "convert_to_dataframe_progress":
      return "Processing data... - it may take a while, Please wait.";
    case "error":
      return "Error: " + message.data;
    case "coordinates_test_progress":
      return `Coordinates test progress: ${message.data?.current} / ${message.data?.total}`;
    case "lmn_test_progress":
      return `LMN test progress: ${message.data?.current} / ${message.data?.total}`;
    case "plot_approved":
      setState({
        plot_img: message.data.img,
      });
      return "Plot approved";
    case "finished":
      setState({
        status: "success",
        response: message.data,
        current_message: "Finished",
      });
      usePopupStore.setState({ isOpen: true });
      return "Finished";
  }
};

export const useProbabilityStore = create(
  persist<State>(
    (set, get) => ({
      status: "idle",
      current_relation: relations[0].value,

      plot_img: "",
      is_open: false,
      response: undefined,
      input: undefined,
      events: [],
      // paramaters: [],
      current_message: "",
      setCurrentRelation: (relation: string) => {
        set({
          current_relation: relation,
        });
      },
      setPlotImg: (img: string) => {
        set({
          plot_img: img,
        });
      },
      reset: () => {
        set({
          status: "idle",
          is_open: false,
          response: undefined,
          input: undefined,
          events: [],
          current_message: "",
        });
      },
      pushEvent: (event: Event) => {
        const { events, status } = get();

        switch (event.event) {
          // case "paramaters":
          //   set({
          //     paramaters: event.data as Parameter[],
          //   });
          //   break;
          case "spawn":
            set({
              status: "loading",
              current_message: "Initializing",
              is_open: true,
            });
            break;
          case "message":
            let message = event.data as Message;
            let current_message = ProbabilityMessageHandler(message);
            if (current_message) {
              set({
                current_message,
              });
            }
            break;
          case "exit":
            if (status === "loading") {
              set({
                status: "error",
                current_message: "Error: Process exited unexpectedly",
                response: undefined,
                events: [],
              });
            }
            set({ is_open: false });
            break;
        }
      },
    }),
    {
      name: "probability-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
