"use client";

import CardTodo from "@/components/CardTodo";
import { useGetTasks } from "@/actions/hooks";
import ToggleTheme from "@/components/ToggleTheme";
import FilterDate from "@/components/FilterDate";
import AddTask from "@/components/AddTask";
import { formatDate } from "@/utils/format";

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
            Task
          </h2>
          <p className="text-slate-400 mt-1">{formatDate(new Date())}</p>
        </div>
        <AddTask />
      </div>

      <FilterDate />

      <div className="flex flex-col gap-8 my-12">
        {data?.map((item, index) => (
          <CardTodo key={index} data={item} />
        ))}
      </div>
    </main>
  );
}
