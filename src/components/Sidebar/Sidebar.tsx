"use client";

import React, { FC } from "react";
import SidebarItemsList from "./SidebarItemsList";
import SidebarItem from "./SidebarItem";

import { Users2, Info, BarChart3, ChevronRight, Wind } from "lucide-react";
import { NavData } from "@/lib/navigation-data";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

interface Props {
  isOpen?: boolean;
}

const Sidebar: FC<Props> = ({ isOpen: isLarge }) => {
  const sidebarIsOpen = useSidebarStore((state) => state.isOpen);
  const isOpen = isLarge || sidebarIsOpen;
  const closeSidebar = useSidebarStore((state) => state.close);
  return (
    <div className="w-full z-50 absolute lg:static">
      <nav
        className={cn(
          isOpen ? "translate-x-0" : "-translate-x-full",
          "h-full transition-all z-20 absolute top-0 left-0 bg-background max-w-[320px] min-h-screen max-h-screen overflow-auto flex flex-col py-4 px-12 w-full border-x border-spacing-0.5 border-border justify-between lg:relative lg:translate-x-0"
        )}
      >
        <div className="h-full flex flex-col gap-5 list-none justify-between">
          <div className="flex flex-col gap-5 list-none">
            {/* <Brand /> */}
            <SidebarItemsList title="Menu">
              <SidebarItem Icon={Info} text="Overview" href="/" />
              <SidebarItem
                Icon={BarChart3}
                text="MR Probability"
                href="/mr_probability"
              />
              <SidebarItem Icon={Wind} text="Prediction" href="/prediction" />
            </SidebarItemsList>
            <SidebarItemsList title="Articles">
              {NavData.map((data) => (
                <SidebarItem
                  key={data.name}
                  className="flex items-center justify-between"
                  text={data.name}
                  href={data.href}
                  AfterIcon={ChevronRight}
                />
                // <SidebarExpandList key={data.name} text={data.name}>
                //   {data.data.map((item) => (
                //     <li key={item.name}>
                //       <SidebarItem
                //         className="flex items-center justify-between"
                //         text={item.name}
                //         href={item.href}
                //       />
                //     </li>
                //   ))}
                // </SidebarExpandList>
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
        {" "}
      </div>
    </div>
  );
};

export default Sidebar;
