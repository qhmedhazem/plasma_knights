"use client";

import dynamic from "next/dynamic";
import React, { FC } from "react";
import SidebarItemsList from "./SidebarItemsList";
import SidebarItem from "./SidebarItem";

import { Users2, Info, FolderClosed, BarChart3 } from "lucide-react";
import Brand from "../ui/Brand";
import { SidebarNav } from "./SidebarNav";
import { NavData } from "@/lib/topics/navigation-data";
const SidebarDarkModeSwitch = dynamic(() => import("./SidebarDarkModeSwitch"), {
  ssr: false,
});

interface Props {}

const Sidebar: FC<Props> = () => {
  return (
    <nav className=" h-full flex flex-col py-12 px-12 w-full min-h-screen border-x border-spacing-0.5 border-border justify-between">
      <div className="h-full flex flex-col gap-10 list-none justify-between">
        <div className="flex flex-col gap-10 list-none">
          <Brand />
          <SidebarItemsList title="Menu">
            <SidebarItem Icon={Info} text="Introduction" href="/" />
            <SidebarItem
              Icon={BarChart3}
              text="MR Probability"
              href="/mr_probability"
            />
            <SidebarItem
              Icon={FolderClosed}
              text="Topics"
              // @ts-ignore
              href={NavData[0].data[0].href || ""}
            />
          </SidebarItemsList>
        </div>

        <SidebarItemsList title="General">
          <SidebarItem Icon={Users2} text="Our Team" href="/team" />
          <SidebarDarkModeSwitch />
        </SidebarItemsList>
      </div>
    </nav>
  );
};

export default Sidebar;
