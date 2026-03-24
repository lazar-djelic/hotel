import api from "../../../lib/axios";
import type { RoomStruct, SimpleRoomStruct } from "../structs/RoomStruct";

export const fetchRooms = async (roomNumber: number): Promise<RoomStruct[]> => {
  const res = await api.get("/rooms", { params: { room: roomNumber } });
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
