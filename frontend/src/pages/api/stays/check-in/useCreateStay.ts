import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createStay } from "../stays.api";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../config/routes";

export const useCreateStay = (navigate: NavigateFunction, payNow: boolean) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createStay,
    onSuccess: (createdStay) => {
      toast.success(t("toast.staycrsucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STAYS.STAYS],
      });

      if (payNow)
        navigate(ROUTES.PAYMENT.CHECKOUT, { state: { stay: createdStay } });
      else navigate("/");
    },
    onError: () => {
      toast.error(t("toast.staycrfail"));
    },
  });

  return { mutate, isPending };
};
