"use client";

import { BarChart3, LucideChevronLeftSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isSupported } from "@/store/mr-probability-store";
import { usePopupStore } from "@/store/popup-store";
import PopupOverlay from "@/components/PopupOverlay";
import PlotControls from "@/components/Analyzer/PlotControls";
import PlotImg from "@/components/Analyzer/PlotImg";
import { relations } from "@/lib/prediction";
import { usePredictionStore } from "@/store/pr-store";
import CurrentData from "@/components/Prediction/CurrentData";
import ScalesList from "@/components/Prediction/ScalesList";

export default function DataPage() {
  const reset = usePredictionStore((state) => state.reset);

  const currentRelation = usePredictionStore((state) => state.current_relation);
  const setCurrentRelation = usePredictionStore(
    (state) => state.setCurrentRelation
  );

  const plotImage = usePredictionStore((state) => state.current_plot_image);
  const requestPlotImg = usePredictionStore((state) => state.requestPlotImg);
  const showPlot = usePredictionStore((state) => state.showPlot);

  const status = usePredictionStore((state) => state.status);
  const message = usePredictionStore((state) => state.current_message);
  const isProcessOpen = usePredictionStore((state) => state.status !== "error");

  const openResultsPopup = usePopupStore((state) => state.open);

  return (
    <div className="flex flex-col gap-8 min-h-full justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">Predicition Results</h2>
        <p>
          A Prediction Analyzer is a data-driven forecasting tool that leverages
          advanced algorithms and machine learning techniques to process
          historical and real-time data. It provides actionable insights and
          predictions in areas like finance, weather forecasting, and marketing.
          This tool assists decision-makers in strategic planning and risk
          management, optimizing resource allocation and improving
          competitiveness through data-driven decision-making.
        </p>
        <hr />
      </div>
      <div className="flex gap-2">
        <Button
          variant="destructive"
          className="w-full"
          disabled={!isSupported}
          onClick={reset}
        >
          <LucideChevronLeftSquare className="mr-2 h-4 w-4" /> End Process
        </Button>
        <Button
          className="w-full"
          disabled={!isProcessOpen}
          onClick={isProcessOpen ? () => openResultsPopup() : undefined}
        >
          <BarChart3 className="mr-2 h-4 w-4" /> Show Results
        </Button>
        {status === "error" ? (
          <span className="text-red-500">{message}</span>
        ) : null}
        {!isSupported && (
          <span className="text-red-500">This Platform is not supported</span>
        )}
        {!isProcessOpen ? (
          <span className="text-red-500">
            The Python Process is not running.
          </span>
        ) : null}
      </div>
      <PopupOverlay>
        <div className="mb-8">
          <CurrentData />
        </div>
        <div className="w-full flex flex-col-reverse xl:flex-row xl:items-start gap-8 space-betwee">
          <PlotControls
            currentRelation={currentRelation}
            setCurrentRelation={setCurrentRelation}
            relations={relations}
          />
          <PlotImg
            currentRelation={currentRelation}
            plotImage={plotImage}
            requestPlotImg={requestPlotImg}
            setCurrentRelation={setCurrentRelation}
            showPlot={showPlot}
            status={status}
            relations={relations}
          />
        </div>
        <div className="my-8">
          <ScalesList />
        </div>
      </PopupOverlay>
    </div>
  );
}
