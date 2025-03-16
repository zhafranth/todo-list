"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { Task } from "@prisma/client";
import { PRIORITY_LEVELS } from "@/constant";
import { formatDate } from "@/utils/format";
import { Checkbox } from "./ui/checkbox";
import ModalConfirmation from "./ModalConfirmation";
import ActionTodo from "./ActionTodo";
import { useUpdateStatus } from "@/actions/hooks";

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
  const { title, description, status, priority, dueAt, id } = data ?? {};

  const toggleConfirmation = useCallback(
    () => setIsOpen((prevState) => !prevState),
    []
  );

  const { mutate } = useUpdateStatus();
  const handleChangeStatus = useCallback(() => {
    mutate(
      {
        id,
        status: !status,
      },
      {
        onSuccess: () => {
          toggleConfirmation();
        },
      }
    );
  }, [id, mutate, status, toggleConfirmation]);
  return (
    <>
      <div className="w-full rounded-xl px-4 py-6 bg-white dark:bg-neutral-800 text-slate-800 dark:text-slate-100 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <PriorityBadge value={priority} />
          <ActionTodo data={data} />
        </div>
        <div className="flex gap-x-2 ">
          <Checkbox
            className="mt-1"
            checked={status as boolean}
            onCheckedChange={toggleConfirmation}
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
        <div className="h-[1px] w-full my-3 bg-slate-200"></div>
        <div className="flex gap-x-5 text-sm text-slate-500 dark:text-slate-200">
          <div>
            <p>Due Date</p>
            <p className="font-semibold">{formatDate(dueAt)}</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <ModalConfirmation
          title="Update Status"
          description={`Apakah status ${status ? "Belum Selesai" : "Selesai"}`}
          onClose={toggleConfirmation}
          onSubmit={handleChangeStatus}
        />
      )}
    </>
  );
};

export default CardTodo;
