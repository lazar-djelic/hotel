import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { deleteRoom } from "../rooms.api";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useDeleteRoom = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM.ROOMS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.ROOM.ROOM, id] });

      toast.success(t("toast.roomdelsucc"));
      navigate(ROUTES.ADMIN.ROOMS);
    },
    onError: () => {
      toast.error(t("toast.roomdelfail"));
    },
  });

  return { deleteRoom: mutate };
};
