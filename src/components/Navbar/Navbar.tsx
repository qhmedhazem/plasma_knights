"use client";

import dynamic from "next/dynamic";

import React from "react";
import Brand from "../ui/Brand";
import SidebarBurgerButton from "../Sidebar/SidebarBurgerButton";
const NavbarThemeSwitch = dynamic(() => import("./NavbarThemeSwitch"), {
  ssr: false,
});
const Navbar = () => {
  return (
    <div className="flex justify-between items-center leading-none w-full py-6 px-8 border-b-border border-b">
      <SidebarBurgerButton />
      <Brand />
      <NavbarThemeSwitch />
    </div>
  );
};

export default Navbar;
