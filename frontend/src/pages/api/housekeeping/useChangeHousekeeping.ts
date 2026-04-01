import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { QUERY_KEYS } from "../../../config/query-keys";
import toast from "react-hot-toast";
import { changeHousekeeping } from "./housekeeping.api";

export const useChangeHousekeeping = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: changeHousekeeping,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.ROOM.ROOM, data._id], data);

      queryClient.setQueryData([QUERY_KEYS.ROOM.ROOMS], (old: any) => {
        if (!old) return old;
        return old.map((room: any) => (room._id === data._id ? data : room));
      });

      toast.success("Room updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update the room");
    },
  });

  return {
    mutate,
    isPending,
  };
};
