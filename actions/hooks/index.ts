import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, updateTask } from "../networks";
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

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      updateTask(id, status),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteTask, isPending: loadingDelete } = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return { mutateDeleteTask, loadingDelete };
};
