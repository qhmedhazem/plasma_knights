"use client";
import React, { FC, useMemo, useState } from "react";
import { ArrowBigRight, Check, Plus, X } from "lucide-react";

import {
  ResponseData,
  useProbabilityStore,
} from "@/store/mr-probability-store";
import { cn } from "@/lib/utils";
import { relationType } from "@/lib/prediction";
import EventsSelector from "./EventsSelector";

interface Props {
  response?: ResponseData;
  relations: relationType[];
  currentRelation: string | number;
  setCurrentRelation: (relation: string | number) => any;
}

const PlotControls: FC<Props> = ({
  relations,
  currentRelation,
  setCurrentRelation,
  response,
}) => {
  const events = useMemo(() => {
    return response?.lmn_tests.data.map((date_str) =>
      new Date(date_str).toLocaleString()
    );
  }, [response]);

  return (
    <div className="min-w-[350px] overflow-y-auto">
      <h4 className="text-xl">Plot Relationships</h4>
      <div className="mt-8 flex flex-col gap-4">
        {relations.map((relation, index) => (
          <div
            key={relation.value}
            className={cn(
              relation.value == currentRelation ? "bg-accent" : "bg-muted",
              typeof relation.name === "string"
                ? "grid-cols-[1fr_24px]"
                : "grid-cols-[1fr_24px_1fr_24px]",
              "transition-all duration-300 hover:bg-accent grid grid-rows-1 content-between rounded-lg py-2 px-4 cursor-pointer hover:shadow-lg"
            )}
            onClick={() => setCurrentRelation(relation.value)}
          >
            {/* <span className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"> */}
            {Array.isArray(relation.name) ? (
              <>
                {relation.name[0]} <ArrowBigRight /> {relation.name[1]}
              </>
            ) : (
              relation.name
            )}
            {/* </span> */}
            {relation.value == currentRelation ? (
              <Check className="" />
            ) : (
              <Check className="opacity-0" />
            )}
          </div>
        ))}
        {events && events.length > 0 ? (
          <EventsSelector
            events={events}
            selected={currentRelation}
            name="Correlation Bl -> Vl Approved events"
            select={(str) => {
              setCurrentRelation(str);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PlotControls;
