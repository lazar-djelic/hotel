import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { editRoom } from "../rooms.api";
import { ROUTES } from "../../../../config/routes";

export const useEditRoom = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editRoom,
    onSuccess: (_, { id, room }) => {
      queryClient.setQueryData([QUERY_KEYS.ROOM.ROOM, id], room);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM.ROOMS] });

      toast.success("Room updated successfully!");
      navigate(ROUTES.ADMIN.ROOMS);
    },
    onError: () => {
      toast.error("Failed to update the room");
    },
  });

  return {
    saveRoom: mutate,
    saving: isPending,
  };
};
