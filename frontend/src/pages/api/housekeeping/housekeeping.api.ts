import type { HousekeepingOptions } from "../../../config/enums";
import api from "../../../lib/axios";
import type { Room } from "../../../types/RoomType";

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
