"use client";

import { useState } from "react";
import { Check, Loader2, PieChart } from "lucide-react";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { SpaceCraftList } from "@/lib/topics/navigation-data";
import {
  Input as InputInterface,
  Probe,
  useProbabilityStore,
} from "@/store/probability-store";
// import useIpc from "@/hooks/use-ipc";
// import useSocket from "@/hooks/use-socket";
import useIpc from "@/hooks/use-ipc";

type CardProps = React.ComponentProps<typeof Card> & {
  disabled?: boolean;
};

export function InputPage({ className, disabled, ...props }: CardProps) {
  const pushEvent = useProbabilityStore((state) => state.pushEvent);
  const { requestData } = useIpc();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [spacecraft, setSpacecraft] = useState<Probe>("WIND");

  const status = useProbabilityStore((state) => state.status);
  const message = useProbabilityStore((state) => state.current_message);

  const submit = (e: any) => {
    e.preventDefault();
    if (!requestData) return;
    requestData(startDate, endDate, spacecraft);
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <form className="flex flex-col gap-4" onSubmit={submit}>
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="text"
              placeholder="2000-12-30"
              required={true}
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">End Date</label>
            <Input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="text"
              placeholder="2001-12-30"
              required={true}
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Spacecraft</label>
            <Select
              value={spacecraft}
              onValueChange={(value: Probe) => setSpacecraft(value)}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a spacecraft" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SpaceCraftList.map((spacecraft) => (
                    <SelectItem
                      key={spacecraft}
                      value={spacecraft}
                      disabled={spacecraft !== "WIND"}
                    >
                      {spacecraft}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          {disabled ? (
            <div className="flex flex-col gap-1 w-full">
              <Button className="w-full" type="submit" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
              </Button>
              {message && status ? <p>{message}</p> : null}
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
