import { useQuery } from "@tanstack/react-query";
import type { getMyReviewStruct } from "../structs/ReviewStruct";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchMyReview } from "./profile.api";
import { getReviewSchema } from "../../../schemas/review.response.schema";

export const useMyReview = () => {
  const { data: review, isLoading } = useQuery<getMyReviewStruct | null>({
    queryKey: [QUERY_KEYS.REVIEW.REVIEWS],
    queryFn: async () => {
      const rawReview = await fetchMyReview();
      const parsed = getReviewSchema.safeParse(rawReview);
      if (!parsed.success) {
        console.error("Invalid review data", parsed.error);
        return null;
      }
      return parsed.data;
    },
  });

  return {
    review,
    loadingRev: isLoading,
  };
};
