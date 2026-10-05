import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import { deleteRoomReservation } from "../roomReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useDeleteRoomReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationFn: deleteRoomReservation,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATION, id],
      });

      toast.success(t("toast.roomresdelsucc"));
      navigate(ROUTES.RECEPTION.ROOM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.roomresdelfail"));
    },
  });

  return { deleteRoomReservation: mutate };
};
