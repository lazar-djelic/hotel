import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReview } from "../reviews.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { fetchReviewsQueryFn } from "./fetchReviewsQueryFn";
import type { ReviewStruct } from "../../structs/ReviewStruct";

export const useReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<ReviewStruct[]>({
    queryKey: [QUERY_KEYS.REVIEW.REVIEWS],
    queryFn: fetchReviewsQueryFn,
  });

  const { mutate: removeReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, id) => {
      queryClient.setQueryData<ReviewStruct[]>(["reviews"], (old) =>
        old ? old.filter((r) => r._id !== id) : [],
      );
      toast.success("Review deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete the review!");
    },
  });

  return {
    reviews,
    loading: isLoading,
    removeReview,
  };
};
