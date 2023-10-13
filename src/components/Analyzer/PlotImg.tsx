"use client";
import useIpc from "@/hooks/use-ipc";
import { useProbabilityStore } from "@/store/probability-store";
import React, { useEffect } from "react";
import { Skeleton } from "../ui/Skeleton";
import { relations } from "@/lib/analyzer";
import { Button } from "../ui/Button";
import { Loader2, SplineIcon } from "lucide-react";

interface Props {}

const PlotImg = () => {
  const { requestPlotImg, showPlot } = useIpc();
  const plotImage = useProbabilityStore((state) => state.plot_img);
  const currentRelation = useProbabilityStore(
    (state) => state.current_relation
  );
  const response = useProbabilityStore((state) => state.response);
  const setPlotImg = useProbabilityStore((state) => state.setPlotImg);

  useEffect(() => {
    const relation = relations.find((r) => r.value === currentRelation);
    if (requestPlotImg && relation) {
      setPlotImg("");
      requestPlotImg(relation.parameters)
        .then((data: string) => {
          if (data) {
            setPlotImg(data);
          }
        })
        .catch((err: any) => console.log(err));
    }
  }, [currentRelation, response, requestPlotImg, setPlotImg]);

  return plotImage ? (
    <div className="flex flex-col gap-4 justify-center">
      <div
        className="flex self-start justify-center items-center w-full bg-muted rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90"
        onClick={() => showPlot?.()}
      >
        <div className="h-full w-full">
          <img className="w-full" src={"data:image/jpeg;base64," + plotImage} />
        </div>
      </div>
    </div>
  ) : (
    <Skeleton className="flex items-center justify-center w-full aspect-video min-h-full bg-accent rounded-lg">
      <Loader2 className="animate-spin" />
    </Skeleton>
  );
};

export default PlotImg;
