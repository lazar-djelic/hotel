import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createMutationFn } from "./createMutationFn";

export const useCreateReview = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createMutationFn,
    onSuccess: () => {
      toast.success("Review created successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });
      navigate("/reviews");
    },
    onError: () => {
      toast.error("Failed to create a review!");
    },
  });

  return mutation;
};
