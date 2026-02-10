import { roomArraySchema } from "../../../../schemas/room.response.schema";
import { fetchRooms } from "../rooms.api";

export const fetchRoomsQueryFn = async () => {
  const rawRooms = await fetchRooms();
  const parsed = roomArraySchema.safeParse(rawRooms);
  if (!parsed.success) {
    console.error("Invalid room data", parsed.error);
    return [];
  }
  return parsed.data;
};
