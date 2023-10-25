"use client";

import { useCallback, useState } from "react";
import { Loader2, PieChart } from "lucide-react";
import { z } from "zod";

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
import { Input } from "@/components/ui/Input";

import { isSupported, useProbabilityStore } from "@/store/mr-probability-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { durations } from "@/lib/prediction";
import { usePredictionStore } from "@/store/pr-store";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/Select";

type CardProps = React.ComponentProps<typeof Card> & {
  disabled?: boolean;
};

const dateSchema = z.enum(durations as [string, ...string[]]);

const schema = z.object({
  duration: dateSchema,
});

type schemaType = z.infer<typeof schema>;

export default function InputPage({
  className,
  disabled,
  ...props
}: CardProps) {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    register,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const status = usePredictionStore((state) => state.status);
  const message = usePredictionStore((state) => state.current_message);
  const requestData = usePredictionStore((state) => state.requestData);

  const onSubmit = useCallback(
    (data: schemaType) => {
      requestData(data.duration);
    },
    [requestData]
  );

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Prediction</h2>
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
      <div className="flex flex-col justify-start gap-8 max-w-lg">
        <div className="flex flex-col gap-2 w-auto">
          <label className="text-sm font-semibold">Duration</label>
          <Select
            disabled={disabled}
            onValueChange={(v) => setValue("duration", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {durations.map((value) => (
                  <SelectItem value={value} key={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.duration && (
            <p className="text-red-400">{errors.duration.message}</p>
          )}
        </div>

        {message && status === "error" ? (
          <p className="text-red-500">{message}</p>
        ) : null}
        {message && status !== "error" ? <p>{message}</p> : null}
        {!isSupported && (
          <p className="text-red-400">This Platform is not supported</p>
        )}
      </div>

      <div className="flex  gap-4 self-end max-w-max">
        {disabled ? (
          <div className="flex flex-col gap-1 w-full">
            <Button className="w-full" type="submit" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            <Button className="w-full" type="submit" disabled={!isSupported}>
              <PieChart className="mr-2 h-4 w-4" /> Start
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
