import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest } from "../api/guests/guests.api";
import { QUERY_KEYS } from "../../config/query-keys";
import toast from "react-hot-toast";
import type { SimpleGuestStruct } from "../api/structs/GuestStruct";

export const useUpdateGuestCheckIn = (
  id: string,
  updatedGuest: SimpleGuestStruct,
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => editGuest({ id, guest: updatedGuest }),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.GUEST.GUEST, id], data);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUESTS] });

      toast.success("Guest updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update the guest");
    },
  });

  return {
    saveGuest: mutate,
    saving: isPending,
  };
};
