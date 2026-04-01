import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { updateReview } from "../reviews.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { ROUTES } from "../../../../config/routes";

export const useUpdateReview = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateReview,
    onSuccess: (_, { id, review }) => {
      queryClient.setQueryData([QUERY_KEYS.REVIEW.REVIEW, id], review);

      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });

      queryClient.setQueryData([QUERY_KEYS.REVIEW.REVIEWS], (old: any) => {
        if (!old) return old;

        return old.map((r: any) => (r._id === id ? { ...r, ...review } : r));
      });

      toast.success("Review updated successfully!");
      navigate(ROUTES.ALL.REVIEWS);
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
