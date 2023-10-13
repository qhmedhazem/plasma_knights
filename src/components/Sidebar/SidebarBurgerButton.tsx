"use client";

import React from "react";
import { Button } from "../ui/Button";
import { Menu } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";

const SidebarBurgerButton = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  return (
    <Button
      variant="outline"
      onClick={toggleSidebar}
      className="block lg:hidden"
    >
      <Menu className="text-primary" />
    </Button>
  );
};

export default SidebarBurgerButton;
