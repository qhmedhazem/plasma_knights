import React from "react";
import { Satisfy } from "next/font/google";
import { cn } from "@/lib/utils";

const satisfy = Satisfy({
  weight: ["400"],
  subsets: ["latin"],
});

const Brand = () => {
  return (
    <div className={cn(satisfy.className, "flex gap-2 text-3xl text-blue-500")}>
      <span>Plasma Knights</span>
    </div>
  );
};

export default Brand;
