"use client";

import { useState } from "react";
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

import { useProbabilityStore } from "@/store/probability-store";
// import useIpc from "@/hooks/use-ipc";
// import useSocket from "@/hooks/use-socket";
import useIpc from "@/hooks/use-ipc";
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
  const { requestData } = useIpc();
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

  const onSubmit = (data: schemaType) => {
    if (!requestData) return;
    requestData(data.startDate, data.endDate);
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>MR Events Analazyer</CardTitle>
          <CardDescription>
            Analayze Magnetic Reconnection Events During Certain Time range
            using plots
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
        </CardContent>
        <CardFooter>
          {disabled ? (
            <div className="flex flex-col gap-1 w-full">
              <Button className="w-full" type="submit" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
              </Button>
              {message && status === "error" ? (
                <p className="text-red-500">{message}</p>
              ) : null}
              {message && status !== "error" ? <p>{message}</p> : null}
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full">
              <Button className="w-full" type="submit" disabled={!requestData}>
                <PieChart className="mr-2 h-4 w-4" /> Start
              </Button>
              {!requestData && (
                <p className="text-red-400">This Platform is not supported</p>
              )}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
