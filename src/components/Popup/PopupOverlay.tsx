"use client";

import React, { useState } from "react";
import { PanInfo, motion, useMotionValue, useTransform } from "framer-motion";
import { usePopupStore } from "@/store/popup-store";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
import PlotImg from "../Analyzer/PlotImg";
import PlotControls from "../Analyzer/PlotControls";

const PopupOverlay = () => {
  const isOpen = usePopupStore((state) => state.isOpen);
  const closePopup = usePopupStore((state) => state.close);

  const [dragging, setDragging] = useState(false);
  const y = useMotionValue(0);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setDragging(false);
    console.log(y.get());
    if (y.get() > 120) {
      closePopup();
    }
  };

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
      className="overflow-y-auto flex flex-col justify-end absolute top-0 z-50 w-full h-full"
    >
      <motion.div
        // style={{ y }}
        // drag="y"
        // dragConstraints={{ top: 0, bottom: 0 }}
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        className="min-h-full overflow-y-auto rounded-t-lg bg-background border-border border-spacing-0.5 border w-auto h-auto max-h-full"
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
        <div className="flex flex-col xl:flex-row gap-8 space-between w-full py-8 px-8">
          <PlotControls />
          <PlotImg />
        </div>
        {/* )} */}
      </motion.div>
    </motion.div>
  );
};

export default PopupOverlay;
