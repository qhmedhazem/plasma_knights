"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar-store";

interface Props {
  className?: string;
  Icon?: LucideIcon;
  AfterIcon?: LucideIcon;
  text: string;
  href: string;
  isActive?: boolean;
  progress?: number;
}

const SidebarItem: FC<Props> = ({
  className,
  Icon,
  AfterIcon,
  text,
  href,
  isActive,
}) => {
  const closeSidebar = useSidebarStore((state) => state.close);

  const pathname = usePathname();
  isActive = (href !== "/" ? pathname.startsWith(href) : pathname == href)
    ? true
    : isActive;

  return (
    <li className="relative overflow-hidden">
      <Link
        href={href}
        className={cn(
          className,
          "flex justify-items-center align-middle gap-2 text-md font-medium text-secondary-foreground",
          isActive ? " text-blue-600" : "hover:text-blue-600"
        )}
        onClick={closeSidebar}
      >
        {Icon && (
          <Icon strokeWidth={1.5} className={isActive ? "text-blue-600" : ""} />
        )}
        {text}
        {AfterIcon && (
          <AfterIcon
            strokeWidth={1.5}
            className={isActive ? "text-blue-600" : ""}
          />
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
