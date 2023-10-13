"use client";

import dynamic from "next/dynamic";
import React, { FC } from "react";
import SidebarItemsList from "./SidebarItemsList";
import SidebarItem from "./SidebarItem";

import {
  Users2,
  Info,
  FolderClosed,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavData } from "@/lib/topics/navigation-data";
import SidebarExpandList from "./SidebarExpandList";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
const SidebarDarkModeSwitch = dynamic(() => import("./SidebarDarkModeSwitch"), {
  ssr: false,
});

interface Props {
  isOpen?: boolean;
}

const Sidebar: FC<Props> = ({ isOpen: isLarge }) => {
  const isOpen = isLarge || useSidebarStore((state) => state.isOpen);
  const closeSidebar = useSidebarStore((state) => state.close);
  return (
    <AnimatePresence>
      <div className={cn("w-full absolute lg:static")}>
        <nav
          className={cn(
            isOpen ? "translate-x-0" : "-translate-x-full",
            "transition-all z-20 absolute top-0 left-0 bg-background max-w-[320px] min-h-screen max-h-screen overflow-auto flex flex-col py-4 px-12 w-full border-x border-spacing-0.5 border-border justify-between lg:relative lg:translate-x-0"
          )}
        >
          <div className="h-full flex flex-col gap-5 list-none justify-between">
            <div className="flex flex-col gap-5 list-none">
              {/* <Brand /> */}
              <SidebarItemsList title="Menu">
                <SidebarItem Icon={Info} text="Introduction" href="/" />
                <SidebarItem
                  Icon={BarChart3}
                  text="MR Probability"
                  href="/mr_probability"
                />
                {/* <SidebarItem
              Icon={FolderClosed}
              text="Topics"
              // @ts-ignore
              href={NavData[0].data[0].href || ""}
            /> */}
              </SidebarItemsList>
              <SidebarItemsList title="Articles">
                {NavData.map((data) => (
                  // <SidebarItem
                  //   className="flex items-center justify-between"
                  //   text={data.name}
                  //   href={data.href}
                  //   AfterIcon={ChevronRight}
                  // />
                  <SidebarExpandList key={data.name} text={data.name}>
                    {data.data.map((item) => (
                      <li key={item.name}>
                        <SidebarItem
                          className="flex items-center justify-between"
                          text={item.name}
                          href={item.href}
                        />
                      </li>
                    ))}
                  </SidebarExpandList>
                ))}
              </SidebarItemsList>
            </div>

            <SidebarItemsList title="General">
              <SidebarItem Icon={Users2} text="Our Team" href="/team" />
              {/* <SidebarDarkModeSwitch /> */}
            </SidebarItemsList>
          </div>
        </nav>
        <div
          className={cn(
            isOpen ? "block" : "hidden",
            "z-10 top-0 left-0 absolute w-screen h-screen bg-[rgba(0,0,0,0.5)] lg:hidden"
          )}
          onClick={closeSidebar}
        >
          Hi
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Sidebar;
