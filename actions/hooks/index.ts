import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../networks";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["taks"],
    queryFn: () => getTasks(),
  });
};
