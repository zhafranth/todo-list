"use client";

import React from "react";
import { Switch } from "./ui/switch";
import useTheme from "@/utils/useTheme";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

const ToggleTheme = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="flex gap-x-4 items-center">
      <Switch onCheckedChange={toggleTheme} className="bg-red-400" />
      {theme === "dark" ? <FaMoon /> : <IoMdSunny />}
    </div>
  );
};

export default ToggleTheme;
