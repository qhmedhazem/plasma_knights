"use client";

import { BarChart3, LucideChevronLeftSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isSupported, useProbabilityStore } from "@/store/mr-probability-store";
import { usePopupStore } from "@/store/popup-store";
import PopupOverlay from "@/components/PopupOverlay";
import PlotControls from "@/components/Analyzer/PlotControls";
import PlotImg from "@/components/Analyzer/PlotImg";
import { relations } from "@/lib/mr-analyzer";

export default function DataPage() {
  const response = useProbabilityStore((state) => state.response);
  const reset = useProbabilityStore((state) => state.reset);

  const currentRelation = useProbabilityStore(
    (state) => state.current_relation
  );
  const setCurrentRelation = useProbabilityStore(
    (state) => state.setCurrentRelation
  );

  const plotImage = useProbabilityStore((state) => state.current_plot_image);
  const requestPlotImg = useProbabilityStore((state) => state.requestPlotImg);
  const requestLmnPlotImg = useProbabilityStore(
    (state) => state.requestLmnPlotImg
  );
  const showPlot = useProbabilityStore((state) => state.showPlot);

  const status = useProbabilityStore((state) => state.status);
  const message = useProbabilityStore((state) => state.current_message);
  const isProcessOpen = useProbabilityStore(
    (state) => state.status !== "error"
  );

  const openResultsPopup = usePopupStore((state) => state.open);

  return (
    <div className="flex flex-col gap-8 min-h-full justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">Magnetic Reconnection Analyzer Results</h2>
        <p>
          A Magnetic Reconnection Analyzer is an essential scientific instrument
          for studying the intricate process of magnetic reconnection in
          plasmas. By measuring magnetic field strength, plasma density, and
          particle velocities, it enables insights into solar flares,
          geomagnetic storms, and fusion energy processes. Its applications
          extend to space weather prediction and controlled fusion research.
        </p>
        <hr />
      </div>
      <div className="flex flex-col gap-4 max-w-lg">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Possible Events</span>
          <div className="border border-input ring-offset-background rounded-md px-3 py-2">
            {response?.coordinates_tests.count}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">LMN Approved Events</span>
          <div className="border border-input ring-offset-background rounded-md px-3 py-2">
            {response?.lmn_tests.count}
          </div>
        </div>
      </div>
      <div className="flex gap-1 w-full">
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
        <div className="w-full flex flex-col-reverse xl:flex-row xl:items-start gap-8 space-betwee">
          <PlotControls
            response={response}
            currentRelation={currentRelation}
            setCurrentRelation={setCurrentRelation}
            relations={relations}
          />
          <PlotImg
            currentRelation={currentRelation}
            plotImage={plotImage}
            requestPlotImg={requestPlotImg}
            requestLmnPlotImg={requestLmnPlotImg}
            setCurrentRelation={setCurrentRelation}
            showPlot={showPlot}
            status={status}
            relations={relations}
          />
        </div>
      </PopupOverlay>
    </div>
  );
}
