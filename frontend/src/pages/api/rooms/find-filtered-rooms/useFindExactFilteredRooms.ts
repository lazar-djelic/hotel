import { useMutation } from "@tanstack/react-query";
import {
  getRoomArraySchema,
  roomArraySchema,
  type SimpleFindFilteredRoomType,
} from "../../../../schemas/room.response.schema";
import { fetchExactFilteredRooms } from "../rooms.api";

export const useFindExactFilteredRooms = () => {
  return useMutation({
    mutationFn: async (filters: SimpleFindFilteredRoomType) => {
      const rawRooms = await fetchExactFilteredRooms(filters);
      const parsed = getRoomArraySchema.safeParse(rawRooms);
      if (!parsed.success) {
        console.error("Invalid room data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });
};
