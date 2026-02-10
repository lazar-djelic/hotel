import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { RoomStruct } from "../RoomStruct";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { deleteRoom } from "../rooms.api";
import { fetchRoomsQueryFn } from "./fetchRoomsQueryFN";

export const useRooms = () => {
  const queryClient = useQueryClient();

  const { data: rooms = [], isLoading } = useQuery<RoomStruct[]>({
    queryKey: [QUERY_KEYS.ROOM.ROOMS],
    queryFn: fetchRoomsQueryFn,
  });

  const { mutate: removeRoom } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: (_, id) => {
      queryClient.setQueryData<RoomStruct[]>(["rooms"], (old) =>
        old ? old.filter((r) => r._id !== id) : [],
      );
      toast.success("Room deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete the room!");
    },
  });

  return {
    rooms,
    loading: isLoading,
    removeRoom,
  };
};
