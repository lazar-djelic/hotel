import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { NavigateFunction } from "react-router-dom";
import { createGuestAndAmResRec } from "../amenityReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateGuestAndAmResRec = (
  navigate: NavigateFunction,
  payNow: boolean,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createGuestAndAmResRec,
    onSuccess: (createdAmres) => {
      toast.success(t("toast.amrescrcucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });

      if (payNow)
        navigate(ROUTES.PAYMENT.CHECKOUT, {
          state: { amres: createdAmres },
        });
      else navigate(ROUTES.RECEPTION.AM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.amrescrfail"));
    },
  });

  return { mutate, isPending };
};
