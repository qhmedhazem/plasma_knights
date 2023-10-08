"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  // paramaters: Parameter[];
  input: Input | undefined;
  current_message: string;
  events: Event[];
  reset: () => void;
  pushEvent: (event: Event) => any;
}

export const ProbabilityMessageHandler = (message: Message) => {
  const setState = useProbabilityStore.setState;
  switch (message.event) {
    case "importing_data":
      return `Importing data... - ${message.data?.start_date} - ${message.data?.end_date} (${message.data?.probe})`;
    case "import_data_progress":
      return `Importing data... - ${new Date(
        message.data?.start_date
      ).toDateString()} - ${new Date(message.data?.end_date).toDateString()} (${
        message.data?.probe
      })`;
    case "error":
      return "Error: " + message.data;
    case "coordinates_test_progress":
      return `Coordinates test progress: ${message.data?.current} / ${message.data?.total}`;
    case "lmn_test_progress":
      return `LMN test progress: ${message.data?.current} / ${message.data?.total}`;
    case "finished":
      setState({
        status: "success",
        response: message.data,
        current_message: "Finished",
      });
      return "Finished";
  }
};

export const useProbabilityStore = create(
  persist<State>(
    (set, get) => ({
      status: "idle",
      is_open: false,
      response: undefined,
      input: undefined,
      events: [],
      // paramaters: [],
      current_message: "",
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
