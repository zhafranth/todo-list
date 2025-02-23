"use client";

import { Button } from "@/components/ui/button";
import useTheme from "@/utils/useTheme";
import { IoSunny } from "react-icons/io5";
import { FaCloudMoon } from "react-icons/fa";

export default function Home() {
  const { toggleTheme, theme } = useTheme();
  return (
    <main className="container bg-white dark:bg-neutral-900 min-h-screen px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-700 dark:text-neutral-300">
            Today&apos;s Task
          </h2>
          <p className="text-slate-400">Minggu, 10 Januari 2024</p>
        </div>
        <Button variant="secondary" color="primary" onClick={toggleTheme}>
          {theme === "light" ? <IoSunny /> : <FaCloudMoon />}
        </Button>
      </div>

      <div className="flex flex-col my-12">
        <div className="w-full rounded-xl h-40 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600"></div>
      </div>
    </main>
  );
}
