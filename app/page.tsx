"use client";

import { Button } from "@/components/ui/button";
import useTheme from "@/utils/useTheme";
import { IoSunny } from "react-icons/io5";
import { FaCloudMoon } from "react-icons/fa";
import CardTodo from "@/components/CardTodo";

export default function Home() {
  const { toggleTheme, theme } = useTheme();
  return (
    <main className="container bg-neutral-50 dark:bg-neutral-900 min-h-screen px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-700 dark:text-neutral-300">
            Today&apos;s Task
          </h2>
          <p className="text-slate-400 mt-1">Minggu, 10 Januari 2024</p>
        </div>
        <Button variant="secondary" color="primary" onClick={toggleTheme}>
          {theme === "light" ? <IoSunny /> : <FaCloudMoon />}
        </Button>
      </div>

      <div className="flex flex-col gap-8 my-12">
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
      </div>
    </main>
  );
}
