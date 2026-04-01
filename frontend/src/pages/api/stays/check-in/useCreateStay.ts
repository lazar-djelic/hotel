import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createStay } from "../stays.api";

export const useCreateStay = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createStay,
    onSuccess: () => {
      toast.success("Stay created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STAYS.STAYS],
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to create stay");
    },
  });

  return { mutate, isPending };
};
