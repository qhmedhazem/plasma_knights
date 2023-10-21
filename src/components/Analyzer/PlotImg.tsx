"use client";
import React, { FC, useEffect } from "react";
import { Skeleton } from "../ui/Skeleton";
import { eventRelation } from "@/lib/analyzer";
import { Loader2 } from "lucide-react";
import { Status } from "@/store/mr-probability-store";
import { relationType } from "@/lib/prediction";

interface Props {
  status: Status;
  plotImage: string;
  currentRelation: string | number;
  relations: relationType[];
  setCurrentRelation: (relation: string) => any;
  requestPlotImg: (
    relation: string[] | string[][] | undefined
  ) => Promise<string | undefined>;
  requestLmnPlotImg?: (data: any) => any;
  showPlot: () => any;
}

const PlotImg: FC<Props> = ({
  plotImage,
  currentRelation,
  status,
  setCurrentRelation,
  requestLmnPlotImg,
  requestPlotImg,
  showPlot,
  relations,
}) => {
  useEffect(() => {
    const relation = relations.find((r) => r.value === currentRelation);
    if (relation) {
      console.log("request", relation);
      requestPlotImg(relation ? relation?.parameters : undefined);
    } else if (requestLmnPlotImg) {
      requestLmnPlotImg({
        index: currentRelation,
        columns: eventRelation.parameters,
      });
    }
  }, [requestLmnPlotImg, requestPlotImg, currentRelation, status, relations]);

  return plotImage ? (
    <div className="flex flex-col gap-4 justify-center">
      <div
        className="flex self-start justify-center items-center w-full bg-muted rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90"
        onClick={() => showPlot()}
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
