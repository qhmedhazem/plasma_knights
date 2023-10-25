"use client";
import { levelsColors } from "@/lib/impacts";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ButtonProps {
  scale_key: string;
  level: string;
  is_selected?: boolean;
  onClick: () => void;
}

const ScaleButton: FC<ButtonProps> = ({
  scale_key,
  level,
  is_selected,
  onClick,
}) => {
  const found = levelsColors.find((l) => l.key === level);
  let color = levelsColors[0].color;
  if (found) {
    color = found.color;
  }

  return (
    <button
      className={cn(
        "flex flex-col justify-center items-center w-16 h-16 rounded-lg transition-all font-bold",
        is_selected
          ? "shadow-[0px_6px_24px_rgba(0,0,0,0.7)] scale-110 border-2"
          : ""
      )}
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}
    >
      {scale_key}
      {level !== "0" ? level : ""}
    </button>
  );
};
export default ScaleButton;
