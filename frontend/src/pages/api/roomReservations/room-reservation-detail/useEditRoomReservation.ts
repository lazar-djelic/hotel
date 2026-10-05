import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import { updateRoomReservationReception } from "../roomReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useEditRoomReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: updateRoomReservationReception,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATION, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });

      toast.success(t("toast.roomresupsucc"));
      navigate(ROUTES.RECEPTION.ROOM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.roomresupfail"));
    },
  });

  return {
    saveRoomReservation: mutate,
    saving: isPending,
  };
};
