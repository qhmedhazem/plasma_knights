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

type CardProps = React.ComponentProps<typeof Card> & {
  disabled?: boolean;
};

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");

const schema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
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
    reset,
    register,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const status = useProbabilityStore((state) => state.status);
  const message = useProbabilityStore((state) => state.current_message);
  const requestData = useProbabilityStore((state) => state.requestData);

  const onSubmit = useCallback(
    (data: schemaType) => {
      requestData(data.startDate, data.endDate);
    },
    [requestData]
  );

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">MR Events Analazyer</h2>
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
      <div className="flex flex-col justify-start gap-8 max-w-lg">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Start Date</label>
          <Input
            type="text"
            placeholder="2000-01-01"
            disabled={disabled}
            {...register("startDate", { required: true })}
          />
          {errors.startDate && (
            <p className="text-red-400">{errors.startDate.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">End Date</label>
          <Input
            type="text"
            placeholder="2000-01-30"
            disabled={disabled}
            {...register("endDate", { required: true })}
          />
          {errors.endDate && (
            <p className="text-red-400">{errors.endDate.message}</p>
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
