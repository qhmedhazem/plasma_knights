"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  text: string;
}

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

const SidebarExpandList: FC<Props> = ({ children, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="relative overflow-hidden">
      <div
        className={cn(
          "text-secondary-foreground w-full justify-between cursor-pointer flex items-center gap-2 text-md font-medium hover:text-blue-600",
          isOpen ? "text-blue-600" : ""
        )}
        onClick={toggleOpen}
      >
        {text}
        <motion.div
          animate={{
            rotate: isOpen ? 0 : 180,
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
              duration: 0.3,
            }}
          >
            <ul className="pl-4 flex flex-col gap-4 mt-4">{children}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default SidebarExpandList;
