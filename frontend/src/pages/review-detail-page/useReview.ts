import { useQuery } from "@tanstack/react-query";
import type { ReviewStruct } from "../interfaces/ReviewStruct";
import { QUERY_KEYS } from "../../config/query-keys";
import { fetchReviewQueryFn } from "./fetchReviewQueryFn";

export const useReview = (id: string) => {
  const { data: review, isLoading } = useQuery<ReviewStruct>({
    queryKey: [QUERY_KEYS.REVIEW.REVIEW, id],
    queryFn: () => fetchReviewQueryFn(id),
    enabled: !!id,
  });

  return { review, loading: isLoading };
};
