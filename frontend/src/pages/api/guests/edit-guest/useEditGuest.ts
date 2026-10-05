import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { editGuest } from "../guests.api";
import type { Dispatch, SetStateAction } from "react";
import type { GuestStruct } from "../../structs/GuestStruct";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useEditGuest = (
  navigate: NavigateFunction,
  setForm: Dispatch<SetStateAction<GuestStruct | null>>,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: editGuest,
    onSuccess: (_, { id, guest }) => {
      queryClient.setQueryData([QUERY_KEYS.GUEST.GUEST, id], guest);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUESTS] });

      toast.success(t("toast.guestupsucc"));

      queryClient.invalidateQueries({ queryKey: ["me"] });
      setForm(null);
      navigate(ROUTES.GUEST.PROFILE);
    },
    onError: () => {
      toast.error(t("toast.guestupfail"));
    },
  });

  return {
    saveGuest: mutate,
    saving: isPending,
  };
};
