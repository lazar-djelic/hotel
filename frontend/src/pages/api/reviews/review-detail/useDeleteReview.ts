import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { deleteReview } from "../reviews.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useDeleteReview = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEW, id] });

      toast.success(t("toast.revdelsucc"));
      navigate(ROUTES.ALL.REVIEWS);
    },
    onError: () => {
      toast.error(t("toast.revdelfail"));
    },
  });

  return { deleteReview: mutate };
};
