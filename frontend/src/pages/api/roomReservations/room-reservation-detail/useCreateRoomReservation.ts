import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { NavigateFunction } from "react-router-dom";
import { createRoomResRec } from "../roomReservations.api";

export const useCreateRoomReservationRec = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createRoomResRec,
    onSuccess: () => {
      toast.success("Room reservation created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });
      navigate("/reception/room-reservations");
    },
    onError: () => {
      toast.error("Failed to create room reservation");
    },
  });

  return { mutate, isPending };
};
