import { useQuery } from "@tanstack/react-query";
import type { RoomStruct } from "../structs/RoomStruct";
import { QUERY_KEYS } from "../../../config/query-keys";
import { getRoomArraySchema } from "../../../schemas/room.response.schema";
import { fetchHousekeepingRooms } from "./housekeeping.api";

export const useHousekeepingRooms = () => {
  const { data: priorityrooms = [], isLoading } = useQuery<RoomStruct[]>({
    queryKey: [QUERY_KEYS.H_ROOM.H_ROOMS],
    queryFn: async () => {
      const rawRooms = await fetchHousekeepingRooms();
      const parsed = getRoomArraySchema.safeParse(rawRooms);
      if (!parsed.success) {
        console.error("Invalid room data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    priorityrooms,
    loadingP: isLoading,
  };
};
