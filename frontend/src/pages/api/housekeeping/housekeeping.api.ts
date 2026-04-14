import type { HousekeepingOptions } from "../../../config/enums";
import api from "../../../lib/axios";
import type { Room } from "../../../types/RoomType";
import type { RoomStruct } from "../structs/RoomStruct";

export const changeHousekeeping = async ({
  id,
  status,
}: {
  id: string;
  status: HousekeepingOptions;
}): Promise<Room> => {
  console.log(id, status);
  const res = await api.post(`/housekeeping/room/${id}`, { status });
  return res.data;
};

export const fetchHousekeepingRooms = async (): Promise<RoomStruct[]> => {
  const res = await api.get("/housekeeping/rooms");
  return res.data;
};
