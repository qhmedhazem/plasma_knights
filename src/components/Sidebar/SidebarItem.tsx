"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  Icon?: LucideIcon;
  text: string;
  href: string;
  isActive?: boolean;
  progress?: number;
}

const SidebarItem: FC<Props> = ({ Icon, text, href, isActive }) => {
  const pathname = usePathname();
  isActive = (href !== "/" ? pathname.startsWith(href) : pathname == href)
    ? true
    : isActive;

  return (
    <li className="relative overflow-hidden">
      <Link
        href={href}
        className={cn(
          "flex justify-items-center align-middle gap-2 text-gray-400 text-md font-medium",
          isActive ? " text-bold" : "hover:text-blue-600"
        )}
      >
        {Icon && (
          <Icon strokeWidth={1.5} className={isActive ? "text-blue-600" : ""} />
        )}
        {text}
      </Link>
    </li>
  );
};

export default SidebarItem;
