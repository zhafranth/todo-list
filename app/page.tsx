"use client";

import { Button } from "@/components/ui/button";
import CardTodo from "@/components/CardTodo";
import { useGetTasks } from "@/actions/hooks";
import { HiPlus } from "react-icons/hi";
import ToggleTheme from "@/components/ToggleTheme";

export default function Home() {
  const { data = [] } = useGetTasks();
  return (
    <main className="container bg-neutral-50 dark:bg-neutral-900 min-h-screen px-8 py-10">
      <div className="flex justify-end">
        <ToggleTheme />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-700 dark:text-neutral-300">
            Today&apos;s Task
          </h2>
          <p className="text-slate-400 mt-1">Minggu, 10 Januari 2024</p>
        </div>
        <Button variant="secondary" color="primary">
          <HiPlus /> Tambah Task
        </Button>
      </div>

      <div className="flex flex-col gap-8 my-12">
        {data?.map((item, index) => (
          <CardTodo key={index} data={item} />
        ))}
      </div>
    </main>
  );
}
