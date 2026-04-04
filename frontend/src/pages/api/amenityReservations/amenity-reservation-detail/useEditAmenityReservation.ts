import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { updateAmenityReservationReception } from "../amenityReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useEditAmenityReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAmenityReservationReception,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATION, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });

      toast.success(t("toast.amresupsucc"));
      navigate(ROUTES.RECEPTION.AM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.amresupfail"));
    },
  });

  return {
    saveAmenityReservation: mutate,
    saving: isPending,
  };
};
