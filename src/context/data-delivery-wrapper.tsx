"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Event, useProbabilityStore } from "../store/probability-store";
import useIpc from "@/hooks/use-ipc";

interface DataDeliveryWrapperProps {
  children: React.ReactNode;
}

export default function DataDeliveryWrapper({
  children,
}: DataDeliveryWrapperProps) {
  const { setupDataListner } = useIpc();
  const pushEvent = useProbabilityStore((state) => state.pushEvent);

  useEffect(() => {
    if (setupDataListner) {
      setupDataListner((data: Event) => {
        console.log("Data Delivered", data);
        return pushEvent(data);
      });
    }
    return () => undefined;
  }, [setupDataListner]);

  return <>{children}</>;
}
