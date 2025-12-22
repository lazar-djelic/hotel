import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ReviewStruct } from "../interfaces/ReviewStruct";
import { fetchReviews, deleteReview } from "../api/reviews.api";
import { reviewArraySchema } from "../../schemas/review.response.schema";

export const useReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<ReviewStruct[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const rawReviews = await fetchReviews();
      const parsed = reviewArraySchema.safeParse(rawReviews);
      console.log(parsed);
      if (!parsed.success) {
        console.error("Invalid review data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  const { mutate: removeReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, id) => {
      queryClient.setQueryData<ReviewStruct[]>(["reviews"], (old) =>
        old ? old.filter((r) => r._id !== id) : []
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
