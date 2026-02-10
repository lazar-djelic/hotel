import { roomSchema } from "../../../../schemas/room.response.schema";
import { fetchRoom } from "../rooms.api";

export const fetchRoomQueryFn = async (id: string) => {
  const raw = await fetchRoom(id);
  const parsed = roomSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Invalid room data from API", parsed.error);
    throw new Error("Invalid room data");
  }

  return parsed.data;
};
