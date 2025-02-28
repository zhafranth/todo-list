"use client";

import React, { useMemo } from "react";
import { Badge } from "./ui/badge";
import { HiBadgeCheck } from "react-icons/hi";
import { Task } from "@prisma/client";
import { PRIORITY_LEVELS } from "@/constant";

interface CardTodoProps {
  data: Task;
}

const PriorityBadge: React.FC<{ value: number }> = ({ value }) => {
  const { label } =
    useMemo(() => {
      return PRIORITY_LEVELS.find((item) => item.value === value);
    }, [value]) ?? {};

  const priorityColor = {
    Low: "bg-blue-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <Badge
      variant="secondary"
      className={`${
        priorityColor[label as keyof typeof priorityColor]
      } text-white`}
    >
      {label || "-"}
    </Badge>
  );
};

const CardTodo: React.FC<CardTodoProps> = ({ data }) => {
  const { title, description, status, priority } = data ?? {};

  return (
    <div className="w-full rounded-xl px-8 py-10 bg-white dark:bg-neutral-800 text-slate-800 dark:text-slate-100 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <PriorityBadge value={priority} />
        <div className="text-4xl text-blue-500">
          {status && <HiBadgeCheck />}
        </div>
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-slate-500 dark:text-slate-200">{description}</p>
      <div className="h-[1px] w-full my-5 bg-slate-200"></div>
      <div className="flex gap-x-5 text-sm text-slate-500 dark:text-slate-200">
        <div>
          <p>Created Date</p>
          <p>Minggu, 20 Juni 2023</p>
        </div>
        <div>
          <p>Due Date</p>
          <p>Selasa, 24 Juni 2023</p>
        </div>
      </div>
    </div>
  );
};

export default CardTodo;
