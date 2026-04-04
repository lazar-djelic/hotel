import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createRoomResGuest } from "../roomReservations.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateRoomResGuest = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createRoomResGuest,
    onSuccess: () => {
      toast.success(t("toast.roomrescrsucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });
      navigate(ROUTES.GUEST.PROFILE);
    },
    onError: () => {
      toast.error(t("toast.roomrescrfail"));
    },
  });

  return { mutate, isPending };
};
