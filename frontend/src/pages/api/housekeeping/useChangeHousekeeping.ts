import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../config/query-keys";
import toast from "react-hot-toast";
import { changeHousekeeping } from "./housekeeping.api";
import { useTranslation } from "react-i18next";

export const useChangeHousekeeping = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: changeHousekeeping,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.ROOM.ROOM, data._id], data);

      queryClient.setQueryData([QUERY_KEYS.ROOM.ROOMS], (old: any) => {
        if (!old) return old;
        return old.map((room: any) => (room._id === data._id ? data : room));
      });

      toast.success(t("toast.roomupsucc"));
    },
    onError: () => {
      toast.error(t("toast.roomupfail"));
    },
  });

  return {
    mutate,
    isPending,
  };
};
