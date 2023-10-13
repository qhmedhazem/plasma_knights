"use client";
import { Probe } from "@/store/probability-store";
import { useEffect, useState } from "react";

type requestDataCallback = (data: IpcPayload) => any;
type showPlotFunc = () => any;
type exitProcessFunc = () => any;
type setupDataListner = (callback: requestDataCallback) => any;

type requestPlotImg = (data: any) => any;
type requestDataFunc = (start_date: string, end_date: string) => void;

interface IpcPayload {
  event: string;
  data: any;
}

interface IpcHook {
  requestData?: requestDataFunc;
  showPlot?: showPlotFunc;
  exitProcess?: exitProcessFunc;
  setupDataListner?: setupDataListner;
  requestPlotImg?: requestPlotImg;
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
    // @ts-ignore
    const requestPlotImg = window?.mrProbability?.requestPlotImg;

    return {
      requestData,
      showPlot,
      exitProcess,
      setupDataListner,
      requestPlotImg,
    };
  } else {
    return {};
  }
};

export default useIpc;
