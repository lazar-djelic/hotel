import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReview, fetchReviews } from "../reviews.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { ReviewStruct } from "../../structs/ReviewStruct";
import { reviewArraySchema } from "../../../../schemas/review.response.schema";
import { useTranslation } from "react-i18next";

export const useReviews = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: reviews = [], isLoading } = useQuery<ReviewStruct[]>({
    queryKey: [QUERY_KEYS.REVIEW.REVIEWS],
    queryFn: async () => {
      const rawReviews = await fetchReviews();
      const parsed = reviewArraySchema.safeParse(rawReviews);
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
        old ? old.filter((r) => r._id !== id) : [],
      );
      toast.success(t("toast.revdelsucc"));
    },
    onError: () => {
      toast.error(t("toast.revdelfail"));
    },
  });

  return {
    reviews,
    loading: isLoading,
    removeReview,
  };
};
