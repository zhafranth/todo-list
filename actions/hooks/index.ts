import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTasks } from "../networks";
import { TaskPayload } from "../server-actions";
import { toast } from "sonner";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
};

export const useTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskPayload) => createTask(data),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
