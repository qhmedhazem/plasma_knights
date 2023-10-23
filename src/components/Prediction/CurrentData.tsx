"use client";
import useProgress from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { usePredictionStore } from "@/store/pr-store";
import { Loader2 } from "lucide-react";

const CurrentData = () => {
  const currentData = usePredictionStore((state) => state.current_data);
  const setCurrentData = usePredictionStore((state) => state.getCurrentData);
  const { status, progress } = useProgress(setCurrentData, 25000);

  return (
    <figure className="relative bg-muted rounded-lg overflow-hidden w-full">
      <div className="px-8">
        <h2 className="flex justify-between items-center text-2xl pt-4 gap-2">
          Current Conditions:
          <Loader2
            className={cn(
              "animate-spin",
              status == "loading" ? "block" : "hidden"
            )}
          />
        </h2>
        <div className="flex flex-wrap w-full gap-4 pt-4 pb-8">
          {[
            { name: "Last Update", column: "time_tag", unit: "" },
            { name: "Kp", column: "kp", unit: "" },
            {
              name: "Solar Wind Speed",
              column: "speed",
              unit: "km/s",
            },
            {
              name: "Bt GSM",
              column: "bt",
              unit: "nT",
            },
            {
              name: "Bz GSM",
              column: "bz_gsm",
              unit: "nT",
            },
            {
              name: "Sunspot Number",
              column: "ssn",
              unit: "",
            },
            {
              name: "F10.7 Radio Flux",
              column: "f10.7",
              unit: "sfu",
            },
          ].map(({ name, column, unit }) => (
            <div
              key={column}
              className="px-6 py-4 border-border border-2 rounded"
            >
              <strong>{name}:</strong>
              <span className="ml-2">
                {currentData?.[column]} {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
      <span
        className="absolute bottom-0 block h-1 bg-blue-500"
        style={{
          width: `${progress * 100}%`,
        }}
      ></span>
    </figure>
  );
};

export default CurrentData;
