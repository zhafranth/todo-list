import apiRequest, { ApiResponse } from "@/config/axios";
import { Task } from "@prisma/client";
import { actionCreateTask, TaskPayload } from "../server-actions";

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
