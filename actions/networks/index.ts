import apiRequest, { ApiResponse } from "@/config/axios";
import { Task } from "@prisma/client";

export const getTasks = async () => {
  const response: ApiResponse<Task[]> = await apiRequest({
    method: "GET",
    url: "/task",
  });

  return response.data.data;
};
