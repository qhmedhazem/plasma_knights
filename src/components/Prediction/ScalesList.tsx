"use client";
import React, { FC, useEffect, useState } from "react";
import { usePredictionStore } from "@/store/pr-store";
import Scale from "./Scale";
import useProgress from "@/hooks/useProgress";

const ScalesList = () => {
  const currentScales = usePredictionStore((state) => state.scales);
  const getScalesData = usePredictionStore((state) => state.getScalesData);
  const { status, progress } = useProgress(getScalesData, 25000);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-xl font-bold">Space Weather Conditions In:</h1>
      {currentScales.map((scale, index) => {
        return (
          <Scale
            key={scale.date + " " + scale.time + " " + index}
            scale={scale}
          />
        );
      })}
    </div>
  );
};

export default ScalesList;
