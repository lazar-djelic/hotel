import { useMutation, useQuery } from "@tanstack/react-query";
import type { RoomStruct } from "../../structs/RoomStruct";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { fetchFilteredRooms } from "../rooms.api";
import {
  roomArraySchema,
  type SimpleFindFilteredRoomType,
} from "../../../../schemas/room.response.schema";

export const useFindFilteredRooms = () => {
  return useMutation({
    mutationFn: async (filters: SimpleFindFilteredRoomType) => {
      const rawRooms = await fetchFilteredRooms(filters);
      const parsed = roomArraySchema.safeParse(rawRooms);
      if (!parsed.success) {
        console.error("Invalid room data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });
};
