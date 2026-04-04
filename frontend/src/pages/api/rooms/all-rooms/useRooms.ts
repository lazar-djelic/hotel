import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { RoomStruct } from "../../structs/RoomStruct";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { deleteRoom, fetchRooms } from "../rooms.api";
import { getRoomArraySchema } from "../../../../schemas/room.response.schema";
import { useTranslation } from "react-i18next";

export const useRooms = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: rooms = [], isLoading } = useQuery<RoomStruct[]>({
    queryKey: [QUERY_KEYS.ROOM.ROOMS],
    queryFn: async () => {
      const rawRooms = await fetchRooms();
      const parsed = getRoomArraySchema.safeParse(rawRooms);
      if (!parsed.success) {
        console.error("Invalid room data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  const { mutate: removeRoom } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: (_, id) => {
      queryClient.setQueryData<RoomStruct[]>(["rooms"], (old) =>
        old ? old.filter((r) => r._id !== id) : [],
      );
      toast.success(t("toast.roomdelsucc"));
    },
    onError: () => {
      toast.error(t("toast.roomdelfail"));
    },
  });

  return {
    rooms,
    loading: isLoading,
    removeRoom,
  };
};
