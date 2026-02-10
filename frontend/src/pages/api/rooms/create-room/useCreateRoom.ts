import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createRoomMutationFn } from "../../../rooms/create-room-page/createMutationFn";

export const useCreateRoom = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRoomMutationFn,
    onSuccess: () => {
      toast.success("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM.ROOM] });
      navigate("/config");
    },
    onError: () => {
      toast.error("Failed to create a room!");
    },
  });

  return mutation;
};
