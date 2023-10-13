"use client";

import { BarChart3, LucideChevronLeftSquare, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { useProbabilityStore } from "@/store/probability-store";
import useIpc from "@/hooks/use-ipc";
import { usePopupStore } from "@/store/popup-store";

type CardProps = React.ComponentProps<typeof Card>;

export default function DataPage({ className, ...props }: CardProps) {
  const response = useProbabilityStore((state) => state.response);
  const status = useProbabilityStore((state) => state.status);
  const message = useProbabilityStore((state) => state.current_message);
  const isProcessOpen = useProbabilityStore((state) => state.is_open);
  const reset = useProbabilityStore((state) => state.reset);
  const { showPlot, exitProcess } = useIpc();
  const openResultsPopup = usePopupStore((state) => state.open);

  return (
    <div className="">
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>MR Events Analazyer</CardTitle>
          <CardDescription>
            Analayze Magnetic Reconnection Events During Certain Time range
            using plots
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-1 w-full">
            <Button
              className="w-full"
              disabled={!isProcessOpen}
              onClick={isProcessOpen ? () => openResultsPopup() : undefined}
            >
              <BarChart3 className="mr-2 h-4 w-4" /> Show Results Editor
            </Button>
            <Button
              className="w-full"
              disabled={!exitProcess}
              onClick={
                exitProcess
                  ? () => {
                      exitProcess();
                      reset();
                    }
                  : undefined
              }
            >
              <LucideChevronLeftSquare className="mr-2 h-4 w-4" /> End Process
              and Return
            </Button>
            {status === "error" ? (
              <span className="text-red-500">{message}</span>
            ) : null}
            {!showPlot && (
              <span className="text-red-500">
                This Platform is not supported
              </span>
            )}
            {showPlot && !isProcessOpen ? (
              <span className="text-red-500">
                The Python Process is not running.
              </span>
            ) : null}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
