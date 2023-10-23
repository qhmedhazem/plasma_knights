"use client";

import { useEffect } from "react";
import { useProbabilityStore } from "../store/mr-probability-store";
import { usePredictionStore } from "@/store/pr-store";

interface DataDeliveryWrapperProps {
  children: React.ReactNode;
}

export default function DataDeliveryWrapper({
  children,
}: DataDeliveryWrapperProps) {
  const MrPushEvent = useProbabilityStore((state) => state.pushEvent);
  const PrPushEvent = usePredictionStore((state) => state.pushEvent);
  useEffect(() => {
    const setupDataListner =
      typeof window !== "undefined"
        ? // @ts-ignore
          window?.eventsDelivery?.setupDataListner
        : undefined;
    if (setupDataListner) {
      setupDataListner(([type, data]: [string, Event]) => {
        console.log(type, data);
        if (type === "mr") {
          return MrPushEvent(data);
        } else if (type === "pr") {
          return PrPushEvent(data);
        }
      });
    }
    return () => undefined;
  }, [MrPushEvent, PrPushEvent]);

  return <>{children}</>;
}
