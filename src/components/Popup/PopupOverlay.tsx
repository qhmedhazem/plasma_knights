"use client";

import React, { FC, useState } from "react";
import { PanInfo, motion, useMotionValue, useTransform } from "framer-motion";
import { usePopupStore } from "@/store/popup-store";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const PopupOverlay: FC<Props> = ({ children }) => {
  const isOpen = usePopupStore((state) => state.isOpen);
  const closePopup = usePopupStore((state) => state.close);

  return (
    <motion.div
      variants={{
        open: {
          y: 0,
        },
        closed: {
          y: "150%",
        },
      }}
      transition={{
        duration: 0.3,
        bounce: {
          type: "spring",
          // damping: 10,
          // stiffness: 100,
        },
      }}
      initial="closed"
      exit="closed"
      animate={isOpen ? "open" : "closed"}
      className="flex flex-col justify-end absolute top-0 left-0 z-50 w-full h-full max-h-screen"
    >
      <motion.div
        // style={{ y }}
        // drag="y"
        // dragConstraints={{ top: 0, bottom: 0 }}
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        className="overflow-y-auto min-h-full rounded-t-lg bg-background border-border border-spacing-0.5 border w-auto h-auto"
      >
        <div className="flex items-center justify-between py-4 px-8 text-3xl w-full">
          <span>Results</span>
          <Button
            variant="outline"
            className="w-[2.4rem] h-[2.4rem] p-2"
            onClick={closePopup}
          >
            <X className="w-full h-full" />
          </Button>
        </div>
        {/* {isOpen && ( */}
        <div className="py-8 px-8">{children}</div>
        {/* )} */}
      </motion.div>
    </motion.div>
  );
};

export default PopupOverlay;
