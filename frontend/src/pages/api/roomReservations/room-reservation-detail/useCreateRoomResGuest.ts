import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createRoomResGuest } from "../roomReservations.api";

export const useCreateRoomResGuest = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createRoomResGuest,
    onSuccess: () => {
      toast.success("Room reservation created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });
      navigate("/profile");
    },
    onError: () => {
      toast.error("Failed to create room reservation");
    },
  });

  return { mutate, isPending };
};
