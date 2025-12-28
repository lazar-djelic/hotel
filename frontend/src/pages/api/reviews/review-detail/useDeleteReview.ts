import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { deleteReview } from "../reviews.api";
import { QUERY_KEYS } from "../../../../config/query-keys";

export const useDeleteReview = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEW, id] });

      toast.success("Review deleted successfully!");
      navigate("/reviews");
    },
    onError: () => {
      toast.error("Failed to delete the review!");
    },
  });

  return { deleteReview: mutate };
};
