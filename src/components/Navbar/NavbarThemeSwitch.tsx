"use client";

import * as React from "react";
import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";

export default function NavbarThemeSwitch() {
  const { setTheme, resolvedTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex justify-center items-center"
          variant="outline"
          size="icon"
        >
          {resolvedTheme === "light" && (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          )}
          {resolvedTheme === "dark" && (
            <Moon className="h-[1.2rem] w-[1.2rem]  transition-all rotate-0 scale-100" />
          )}
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={cn(
            "cursor-pointer flex items-center",
            theme === "light" ? "bg-muted" : ""
          )}
          onClick={() => setTheme("light")}
        >
          {theme == "light" && <Check className="w-4 h-4 mr-2" />}
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "cursor-pointer flex items-center",
            theme === "dark" ? "bg-muted" : ""
          )}
          onClick={() => setTheme("dark")}
        >
          {theme == "dark" && <Check className="w-4 h-4 mr-2" />}
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "cursor-pointer flex items-center",
            theme === "system" ? "bg-muted" : ""
          )}
          onClick={() => setTheme("system")}
        >
          {theme == "system" && <Check className="w-4 h-4 mr-2" />}
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
