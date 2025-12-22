import { useQuery } from "@tanstack/react-query";
import type { ReviewStruct } from "../interfaces/ReviewStruct";
import { fetchReview } from "../api/reviews.api";
import { reviewSchema } from "../../schemas/review.response.schema";

export const useReview = (id: string) => {
  const { data: review, isLoading } = useQuery<ReviewStruct>({
    queryKey: ["review", id],
    queryFn: async () => {
      const raw = await fetchReview(id);
      const parsed = reviewSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid review data from API", parsed.error);
        throw new Error("Invalid review data");
      }

      return parsed.data;
    },
    enabled: !!id,
  });

  return { review, loading: isLoading };
};
