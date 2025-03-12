"use client";

import CardTodo from "@/components/CardTodo";
import { useGetTasks } from "@/actions/hooks";
import ToggleTheme from "@/components/ToggleTheme";
import FilterDate from "@/components/FilterDate";
import AddTask from "@/components/AddTask";
import { formatDate } from "@/utils/format";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useCallback, useState } from "react";

export default function Home() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const { data = [] } = useGetTasks(
    {
      start: format(date?.from as Date, "yyyy-MM-dd"),
      end: date?.to
        ? format(date?.to as Date, "yyyy-MM-dd")
        : format(date?.from as Date, "yyyy-MM-dd"),
    },
    !!date?.to
  );

  const handleChangeDate = useCallback(
    (value?: DateRange) => setDate(value),
    []
  );

  return (
    <main className="container bg-neutral-50 dark:bg-neutral-900 min-h-screen px-8 py-10">
      <div className="flex justify-end">
        <ToggleTheme />
      </div>
      <div className="flex items-end justify-between ">
        <div>
          <h2 className="text-3xl font-bold text-neutral-700 dark:text-neutral-300">
            Task
          </h2>
          <p className="text-slate-400 mt-1">{formatDate(new Date())}</p>
          <FilterDate date={date} handleChangeDate={handleChangeDate} />
        </div>
        <AddTask />
      </div>

      <div className="flex flex-col gap-8 my-12">
        {data?.map((item, index) => (
          <CardTodo key={index} data={item} />
        ))}
      </div>
    </main>
  );
}
