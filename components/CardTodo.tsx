"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { HiBadgeCheck } from "react-icons/hi";
import { Task } from "@prisma/client";

interface CardTodoProps {
  data: Task;
}

const CardTodo: React.FC<CardTodoProps> = ({ data }) => {
  const { title, description } = data ?? {};
  return (
    <div className="w-full rounded-xl px-8 py-10 bg-white dark:bg-neutral-800 text-slate-800 dark:text-slate-100 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <Badge variant="secondary" className="bg-red-300">
          High
        </Badge>
        <div className="text-4xl text-blue-500">
          <HiBadgeCheck />
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
