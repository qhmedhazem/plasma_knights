"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { usePopupStore } from "./popup-store";
import { relations } from "@/lib/mr-analyzer";

export const isSupported =
  // @ts-ignore
  typeof window !== "undefined" && !!window?.magneticReconnection;
const requestData =
  typeof window !== "undefined"
    ? // @ts-ignore
      window?.magneticReconnection?.requestData
    : undefined;
const showPlotIPC =
  typeof window !== "undefined"
    ? // @ts-ignore
      window?.magneticReconnection?.showPlot
    : undefined;
const exitProcess =
  typeof window !== "undefined"
    ? // @ts-ignore
      window?.magneticReconnection?.exitProcess
    : undefined;
const requestPlotImgIPC =
  typeof window !== "undefined"
    ? // @ts-ignore
      window?.magneticReconnection?.requestPlotImg
    : undefined;
const requestLmnPlotImgIPC =
  typeof window !== "undefined"
    ? // @ts-ignore
      window?.magneticReconnection?.requestLmnPlotImg
    : undefined;

interface State {
  is_supported: boolean;
  status: Status;
  last_event: Event | undefined;
  current_message: string;

  response: ResponseData | undefined;
  requestData: (start_date: string, end_date: string) => any;
  reset: () => any;

  current_relation: string | number;
  setCurrentRelation: (relation: string | number) => any;

  current_plot_image: string;
  showPlot: () => any;
  requestPlotImg: (
    relation: relationParams | undefined
  ) => Promise<string | undefined>;
  requestLmnPlotImg: (query: { index: number; columns: string[] }) => any;

  pushEvent: (event: Event) => any;
}

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
      is_supported: isSupported,
      status: "idle",
      last_event: undefined,
      current_message: "",
      response: undefined,

      requestData: (start_date, end_date) => requestData(start_date, end_date),
      reset: () => {
        exitProcess();
        return set({
          status: "idle",
          last_event: undefined,
          current_message: "",
          response: undefined,
          current_relation: relations[0].value,
          current_plot_image: undefined,
        });
      },

      current_relation: relations[0].value,
      setCurrentRelation: (relation) => {
        set({
          current_relation: relation,
        });
      },

      current_plot_image: "",
      showPlot: () => {
        return showPlotIPC();
      },
      requestPlotImg: async (relation: string[] | string[][] | undefined) => {
        set({
          current_plot_image: "",
        });
        console.log(relation);
        return requestPlotImgIPC(relation)
          .then((img: string) => {
            if (img) {
              set({
                current_plot_image: img,
              });
            }
          })
          .catch((err: any) => undefined) as Promise<string | undefined>;
      },
      requestLmnPlotImg: ({ index, columns }) => {
        set({
          current_plot_image: "",
        });
        requestLmnPlotImgIPC({ index, columns })
          .then((img: string) => {
            if (img) {
              set({
                current_plot_image: img,
              });
            }
          })
          .catch((err: any) => undefined) as Promise<string | undefined>;
      },
      pushEvent: (event: Event) => {
        const { status } = get();

        switch (event.event) {
          case "spawn":
            set({
              status: "loading",
              current_message: "Initializing",
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
              return set({
                status: "error",
                current_message: "Error: Process exited unexpectedly",
                last_event: undefined,
                response: undefined,
                current_relation: relations[0].value,
                current_plot_image: undefined,
              });
            }
            break;
        }
      },
    }),
    {
      name: "mr-probability-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
