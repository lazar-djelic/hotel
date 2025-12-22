import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { updateReview } from "../api/reviews.api";

export const useUpdateReview = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateReview,
    onSuccess: (_, { id, review }) => {
      queryClient.setQueryData(["review", id], review);

      queryClient.invalidateQueries({ queryKey: ["reviews"] });

      toast.success("Review updated successfully!");
      navigate("/reviews");
    },
    onError: () => {
      toast.error("Failed to update the review");
    },
  });

  return {
    saving: isPending,
    saveReview: mutate,
  };
};
