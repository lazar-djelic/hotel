import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { NavigateFunction } from "react-router-dom";
import { createGuestAndRoomResRec } from "../roomReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateGuestAndRoomResRec = (
  navigate: NavigateFunction,
  payNow: boolean,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createGuestAndRoomResRec,
    onSuccess: (createdRoomres) => {
      toast.success(t("toast.roomrescrsucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });

      if (payNow)
        navigate(ROUTES.PAYMENT.CHECKOUT, {
          state: { roomres: createdRoomres },
        });
      else navigate(ROUTES.RECEPTION.ROOM_RES_S);
    },
    onError: () => {
      toast.error(t("toast.roomrescrfail"));
    },
  });

  return { mutate, isPending };
};
