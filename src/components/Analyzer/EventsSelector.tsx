"use client";
import { cn } from "@/lib/utils";
import { ArrowBigRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  events: string[];
  selected: string | number;
  name: string | string[];
  select: (event: number) => any;
}

const EventsSelector: FC<Props> = ({ selected, name, select, events }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={cn(
        isOpen ? "bg-accent" : "bg-muted",
        "transition-all duration-300 hover:bg-accent content-between rounded-lg py-2 px-4 hover:shadow-lg"
      )}
    >
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setIsOpen((state) => !state)}
      >
        {/* <span className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"> */}
        {Array.isArray(name) ? (
          <>
            {name[0]} <ArrowBigRight /> {name[1]}
          </>
        ) : (
          name
        )}
        {/* </span> */}
        <motion.div
          animate={{
            rotate: isOpen && events.length > 0 ? 0 : 180,
          }}
        >
          <ChevronUp />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {events && events.length > 0 ? (
              <ul className="flex flex-col gap-4 mt-4 w-full">
                {events.map((event, index) => (
                  <li
                    key={event}
                    className={cn(
                      selected === index
                        ? "bg-muted/30"
                        : "bg-muted hover:bg-muted/90",
                      "w-full p-2 cursor-pointer rounded-lg"
                    )}
                    onClick={() => select(index)}
                  >
                    {event}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsSelector;
