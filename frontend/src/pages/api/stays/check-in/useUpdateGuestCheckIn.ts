import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest } from "../../guests/guests.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import type { SimpleGuestStruct } from "../../structs/GuestStruct";
import { useTranslation } from "react-i18next";

export const useUpdateGuestCheckIn = (
  id: string,
  updatedGuest: SimpleGuestStruct,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => editGuest({ id, guest: updatedGuest }),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.GUEST.GUEST, id], data);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUESTS] });

      toast.success(t("toast.guestupsucc"));
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
