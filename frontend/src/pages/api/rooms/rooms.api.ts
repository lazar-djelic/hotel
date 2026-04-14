import api from "../../../lib/axios";
import type { SimpleFindFilteredRoomType } from "../../../schemas/room.response.schema";
import type { RoomStruct, SimpleRoomStruct } from "../structs/RoomStruct";
import { formatDate } from "../roomReservations/formatDate";

export const fetchRooms = async (): Promise<RoomStruct[]> => {
  const res = await api.get("/rooms");
  return res.data;
};

export const deleteRoom = async (id: string): Promise<void> => {
  await api.delete(`/rooms/${id}`);
};

export const fetchRoom = async (id: string): Promise<RoomStruct> => {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
};

export const editRoom = async ({
  id,
  room,
}: {
  id: string;
  room: SimpleRoomStruct;
}) => {
  await api.put(`/rooms/${id}`, room);
};

export const fetchFilteredRooms = async (
  parameters: SimpleFindFilteredRoomType,
): Promise<RoomStruct[]> => {
  console.log(parameters);
  const res = await api.post("/reception/find-filtered-rooms", {
    ...parameters,
  });
  return res.data;
};

export const fetchExactFilteredRooms = async (
  parameters: SimpleFindFilteredRoomType,
): Promise<RoomStruct[]> => {
  console.log(parameters);
  const res = await api.post("/reception/find-exact-filtered-rooms", {
    ...parameters,
  });
  console.log(res.data);
  return res.data;
};
