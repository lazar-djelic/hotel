import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { deleteAmenityReservation } from "../amenityReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useDeleteAmenityReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationFn: deleteAmenityReservation,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATION, id],
      });

      toast.success(t("toast.amresdelsucc"));
      navigate(ROUTES.RECEPTION.AM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.amresdelfail"));
    },
  });

  return { deleteAmenityReservation: mutate };
};
