import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createAmenityResRec } from "../amenityReservations.api";
import type { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateAmenityReservationRec = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createAmenityResRec,
    onSuccess: () => {
      toast.success(t("toast.amrescrcucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });
      navigate(ROUTES.RECEPTION.AM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.amrescrfail"));
    },
  });

  return { mutate, isPending };
};
