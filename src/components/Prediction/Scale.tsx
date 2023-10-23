"use client";

import React, { FC, useState } from "react";
import ScaleButton from "./ScaleButton";
import { AnimatePresence, motion } from "framer-motion";
import { scales } from "@/lib/impacts";
import Impacts from "./Impacts";
import { ChevronUp } from "lucide-react";
import { scalesContents, scalesTitles } from "@/lib/prediction";

interface ScaleProps {
  scale: Scale;
}

const Scale: FC<ScaleProps> = ({ scale }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(scales[0]);

  return (
    <div className="flex flex-col w-full bg-muted rounded-lg text-white">
      <h1
        className="flex items-center justify-between w-full cursor-pointer px-4 py-4 text-xl"
        onClick={() => setIsOpen((state) => !state)}
      >
        {scale.date} {scale.time}
        <motion.div
          animate={{
            rotate: isOpen ? 0 : 180,
          }}
        >
          <ChevronUp />
        </motion.div>
      </h1>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="px-4 py-8 flex flex-col items-center overflow-hidden"
            initial={{
              height: 0,
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            transition={{
              duration: 0,
              type: "tween",
            }}
          >
            <div className="justify-self-center inline-flex gap-2 text-xl bg-accent py-2 px-2 rounded-lg">
              {scales.map((scale_key) => (
                <ScaleButton
                  key={scale_key}
                  scale_key={scale_key}
                  level={scale[scale_key].Scale}
                  is_selected={selected == scale_key}
                  onClick={setSelected.bind(null, scale_key)}
                />
              ))}
            </div>
            <div className="mt-8 w-full">
              {scales.map((scale_key) =>
                selected === scale_key ? (
                  <Impacts
                    key={scale_key}
                    scale_key={scale_key}
                    level={scale[scale_key].Scale}
                    title={scalesTitles[scale_key]}
                    contents={scalesContents[scale_key]}
                  />
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scale;
