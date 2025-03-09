"use server";

import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";

export interface TaskPayload {
  title: string;
  description?: string;
  priority: Task["priority"];
  dueAt: Date;
}

export const actionCreateTask = async (data: TaskPayload) => {
  try {
    await prisma.task.create({
      data,
    });
    return {
      status: 200,
      message: "Success create task",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create task");
  }
};

export const actionUpdateStatus = async (id: string, status: boolean) => {
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: { status },
    });
    return {
      status: 200,
      message: "Success update status task",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to update status task");
  }
};

export const actionUpdateTask = async (id: string, data: TaskPayload) => {
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data,
    });
    return {
      status: 200,
      message: "Success update task",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to update task");
  }
};

export const actionDeleteTask = async (id: string) => {
  try {
    await prisma.task.delete({
      where: {
        id,
      },
    });
    return {
      status: 200,
      message: "Success delete task",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to delete task");
  }
};
