import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { RoomStruct } from "../../structs/RoomStruct";
import { fetchRoomQueryFn } from "./fetchRoomQueryFn";
import { useMemo } from "react";
import { createEmptySimpleRoom } from "./createEmptyRoom";

export const useRoom = (isNew: boolean, id?: string) => {
  const query = useQuery<RoomStruct>({
    queryKey: [QUERY_KEYS.ROOM.ROOM, id],
    queryFn: () => fetchRoomQueryFn(id!),
    enabled: !isNew,
  });

  const emptyRoom = useMemo(() => createEmptySimpleRoom(), []);

  return {
    room: query.data ?? emptyRoom,
    loading: isNew ? false : query.isLoading,
  };
};
