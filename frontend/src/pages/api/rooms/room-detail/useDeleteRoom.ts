import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { deleteRoom } from "../rooms.api";
import { ROUTES } from "../../../../config/routes";

export const useDeleteRoom = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM.ROOMS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.ROOM.ROOM, id] });

      toast.success("Room deleted successfully!");
      navigate(ROUTES.ADMIN.ROOMS);
    },
    onError: () => {
      toast.error("Failed to delete the room!");
    },
  });

  return { deleteRoom: mutate };
};
