"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { HiBadgeCheck } from "react-icons/hi";
import { Task } from "@prisma/client";
import { PRIORITY_LEVELS } from "@/constant";
import { formatDate } from "@/utils/format";
import { Checkbox } from "./ui/checkbox";
import ModalConfirmation from "./ModalConfirmation";

interface CardTodoProps {
  data: Task;
}

const PriorityBadge: React.FC<{ value: string }> = ({ value }) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const { title, description, status, priority, dueAt } = data ?? {};

  const handleChangeStatus = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <div className="w-full rounded-xl px-8 py-10 bg-white dark:bg-neutral-800 text-slate-800 dark:text-slate-100 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <PriorityBadge value={priority} />
          <div className="text-4xl text-blue-500">
            {status && <HiBadgeCheck />}
          </div>
        </div>
        <div className="flex gap-x-2 ">
          <Checkbox
            className="mt-1"
            checked={status as boolean}
            onCheckedChange={handleChangeStatus}
          />
          <div>
            <h2
              className={`text-xl font-semibold ${
                status ? "line-through" : ""
              }`}
            >
              {title}
            </h2>
            <p className="text-slate-500 dark:text-slate-200">{description}</p>
          </div>
        </div>
        <div className="h-[1px] w-full my-5 bg-slate-200"></div>
        <div className="flex gap-x-5 text-sm text-slate-500 dark:text-slate-200">
          <div>
            <p>Due Date</p>
            <p>{formatDate(dueAt)}</p>
          </div>
        </div>
      </div>
      {isOpen && <ModalConfirmation toggle={handleChangeStatus} data={data} />}
    </>
  );
};

export default CardTodo;
