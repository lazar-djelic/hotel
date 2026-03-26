import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import { deleteRoomReservation } from "../roomReservations.api";

export const useDeleteRoomReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteRoomReservation,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATION, id],
      });

      toast.success("Room reservation deleted successfully!");
      navigate("/reception/room-reservations");
    },
    onError: () => {
      toast.error("Failed to delete the room reservation!");
    },
  });

  return { deleteRoomReservation: mutate };
};
