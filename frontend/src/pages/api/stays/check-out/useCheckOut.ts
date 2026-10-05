import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOut } from "../stays.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../config/routes";
import type { NavigateFunction } from "react-router";

export const useCheckOut = (
  navigate: NavigateFunction,
  id?: string,
  notes?: string,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => checkOut({ id: id || "", notes: notes || "" }),
    onSuccess: (checkedoutStay) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAYS.STAYS] });

      toast.success(t("toast.checkoutsucc"));

      if (checkedoutStay.paid) navigate("/");
      else
        navigate(ROUTES.PAYMENT.CHECKOUT, { state: { stay: checkedoutStay } });
    },
    onError: () => {
      toast.error(t("toast.checkoutfail"));
    },
  });

  return {
    checkOut: mutate,
    // loadingCheckOut: isPending,
  };
};
