"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import { ArrowBigRight, Check, Plus, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { parameters, relations } from "@/lib/analyzer";
import { useProbabilityStore } from "@/store/probability-store";
import { cn } from "@/lib/utils";

interface Props {}

const schema = z.object({
  parameter: z.string(),
  relation_to: z.string().optional(),
});

type schemaType = z.infer<typeof schema>;

const PlotControls: FC<Props> = () => {
  const currentRelation = useProbabilityStore(
    (state) => state.current_relation
  );
  const setCurrentRelation = useProbabilityStore(
    (state) => state.setCurrentRelation
  );
  return (
    <div className="min-w-[350px]">
      <h4 className="text-xl">Plot Relationships</h4>
      <div className="mt-8 flex flex-col gap-4">
        {relations.map((relation, index) => (
          <div
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
      </div>
    </div>
  );
};

export default PlotControls;
