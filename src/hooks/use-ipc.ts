"use client";
import { Probe } from "@/store/probability-store";
import { useEffect, useState } from "react";

type requestDataCallback = (data: IpcPayload) => any;
type showPlotFunc = () => any;
type exitProcessFunc = () => any;
type setupDataListner = (callback: requestDataCallback) => any;

type requestDataFunc = (
  start_date: string,
  end_date: string,
  probe: Probe
) => void;

interface IpcPayload {
  event: string;
  data: any;
}

interface IpcHook {
  requestData?: requestDataFunc;
  showPlot?: showPlotFunc;
  exitProcess?: exitProcessFunc;
  setupDataListner?: setupDataListner;
}

const useIpc = (): IpcHook => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    const requestData = window?.mrProbability?.requestData;
    // @ts-ignore
    const showPlot = window?.mrProbability?.showPlot;
    // @ts-ignore
    const exitProcess = window?.mrProbability?.exitProcess;
    // @ts-ignore
    const setupDataListner = window?.mrProbability?.setupDataListner;

    return { requestData, showPlot, exitProcess, setupDataListner };
  } else {
    return {};
  }
};

export default useIpc;
