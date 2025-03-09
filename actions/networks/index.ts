import apiRequest, { ApiResponse } from "@/config/axios";
import { Task } from "@prisma/client";
import {
  actionCreateTask,
  actionDeleteTask,
  actionUpdateStatus,
  actionUpdateTask,
  TaskPayload,
} from "../server-actions";

export const getTasks = async () => {
  const response: ApiResponse<Task[]> = await apiRequest({
    method: "GET",
    url: "/task",
  });

  return response.data.data;
};

export const createTask = async (data: TaskPayload) => {
  const response = await actionCreateTask(data);
  return response;
};

export const updateStatusTask = async (id: string, status: boolean) => {
  const response = await actionUpdateStatus(id, status);
  return response;
};

export const deleteTask = async (id: string) => {
  const response = await actionDeleteTask(id);
  return response;
};

export const updateTask = async (id: string, data: TaskPayload) => {
  const response = await actionUpdateTask(id, data);
  return response;
};
