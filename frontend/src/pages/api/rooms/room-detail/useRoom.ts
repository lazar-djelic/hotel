import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { RoomStruct } from "../../structs/RoomStruct";
import { useMemo } from "react";
import { createEmptySimpleRoom } from "./createEmptyRoom";
import { fetchRoom } from "../rooms.api";
import { roomSchema } from "../../../../schemas/room.response.schema";

export const useRoom = (isNew: boolean, id?: string) => {
  const query = useQuery<RoomStruct>({
    queryKey: [QUERY_KEYS.ROOM.ROOM, id],
    queryFn: async () => {
      const raw = await fetchRoom(id!);
      const parsed = roomSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid room data from API", parsed.error);
        throw new Error("Invalid room data");
      }

      return parsed.data;
    },
    enabled: !!id,
    //enabled: !isNew, // proveri da li radi sa ovim iznad, ako ne, vrati ovo
  });

  const emptyRoom = useMemo(() => createEmptySimpleRoom(), []);

  return {
    room: query.data ?? emptyRoom,
    loading: isNew ? false : query.isLoading,
  };
};
