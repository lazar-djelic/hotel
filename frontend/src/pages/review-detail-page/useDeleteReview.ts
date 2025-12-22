import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { deleteReview } from "../api/reviews.api";

export const useDeleteReview = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.removeQueries({ queryKey: ["review", id] });

      toast.success("Review deleted successfully!");
      navigate("/reviews");
    },
    onError: () => {
      toast.error("Failed to delete the review!");
    },
  });

  return { deleteReview: mutate };
};
