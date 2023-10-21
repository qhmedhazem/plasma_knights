"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { usePopupStore } from "./popup-store";
import { relations } from "@/lib/prediction";

export const isSupported =
  // @ts-ignore
  typeof window !== "undefined" && !!window?.prediction;
const requestDataIPC =
  // @ts-ignore
  typeof window !== "undefined" ? window?.prediction?.requestData : undefined;
const showPlotIPC =
  // @ts-ignore
  typeof window !== "undefined" ? window?.prediction?.showPlot : undefined;
const exitProcessIPC =
  // @ts-ignore
  typeof window !== "undefined" ? window?.prediction?.exitProcess : undefined;
const requestPlotImgIPC =
  typeof window !== "undefined"
    ? // @ts-ignore
      window?.prediction?.requestPlotImg
    : undefined;

type Status = "idle" | "loading" | "success" | "error";

export type Message = {
  event: string;
  data: any;
};

export type EventData = Message | string;

export interface Event {
  event: string;
  data: EventData;
}

interface State {
  is_supported: boolean;
  status: Status;
  last_event: Event | undefined;
  current_message: string;

  requestData: (duration: string) => any;
  reset: () => any;

  //  relations
  current_relation: string | number;
  setCurrentRelation: (relation: string | number) => any;

  // plots
  current_plot_image: string;
  showPlot: () => any;
  requestPlotImg: (
    relation: string[] | string[][] | undefined
  ) => Promise<string | undefined>;

  //
  pushEvent: (event: Event) => any;
}

export const ProbabilityMessageHandler = (message: Message) => {
  const setState = usePredictionStore.setState;
  switch (message.event) {
    case "importing_data":
      return `Importing data... - ${message.data?.duration}`;
    case "converting_to_dataframe":
      return "Processing data... - it may take a while, Please wait.";
    case "error":
      return "Error: " + message.data;
    case "plot_img_approved":
      setState({
        current_plot_image: message?.data?.img,
      });
    case "finished":
      setState({
        status: "success",
        current_message: "Finished",
      });
      // requestPlotImgIPC();
      usePopupStore.setState({ isOpen: true });
      return "Finished";
  }
};

export const usePredictionStore = create(
  persist<State>(
    (set, get) => ({
      is_supported: isSupported,
      status: "idle",
      last_event: undefined,
      current_message: "",

      requestData: (duration) => requestDataIPC(duration),
      reset: () => {
        exitProcessIPC();
        return set({
          status: "idle",
          last_event: undefined,
          current_message: "",
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
      requestPlotImg: async (relation) => {
        set({
          current_plot_image: "",
        });
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
                current_relation: relations[0].value,
                current_plot_image: undefined,
              });
            }
            break;
        }
      },
    }),
    {
      name: "pr-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
