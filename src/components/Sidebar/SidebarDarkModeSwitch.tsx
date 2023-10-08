"use client";

import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { LucideIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const SidebarDarkModeSwitch: FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <li className="relative overflow-hidden">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn(
          "cursor-pointer flex justify-items-center align-middle gap-2 text-gray-400 text-md font-medium",
          "hover:text-blue-500"
        )}
      >
        {!theme && <Moon strokeWidth={1.5} />}
        {theme === "light" && <Moon strokeWidth={1.5} />}
        {theme === "dark" && <Sun strokeWidth={1.5} />}
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </button>
    </li>
  );
};

export default SidebarDarkModeSwitch;
