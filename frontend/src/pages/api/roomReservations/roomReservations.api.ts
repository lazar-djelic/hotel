import api from "../../../lib/axios";
import type { RangeType } from "../../interfaces/RangeType";
import { formatDate } from "./formatDate";
import type {
  RoomReservationStruct,
  SimpleRoomResCreateReceptionStruct,
  SimpleRoomResCreateStruct,
  SimpleRoomReservationStruct,
} from "../structs/RoomReservationStruct";

export const fetchRoomReservations = async (
  dateRange: RangeType,
): Promise<RoomReservationStruct[]> => {
  const sDate = formatDate(dateRange.startDate);
  const eDate = formatDate(dateRange.endDate);

  const res = await api.get("/roomreservations", {
    params: { startDate: sDate, endDate: eDate },
  });
  return res.data;
};

export const createRoomResRec = async ({
  roomReservation,
}: {
  roomReservation: SimpleRoomResCreateStruct;
}): Promise<void> => {
  await api.post(`/reception/roomreservations/`, roomReservation);
};

type WithoutSomeProperties = Omit<
  SimpleRoomResCreateReceptionStruct,
  "guest" | "_id" | "createdAt" | "updatedAt"
>;
export const createGuestAndRoomResRec = async ({
  roomReservation,
}: {
  roomReservation: WithoutSomeProperties;
}): Promise<void> => {
  await api.post(`/reception/guest-roomreservations/`, {
    ...roomReservation,
  });
};

export const fetchRoomReservation = async (
  id: string,
): Promise<RoomReservationStruct> => {
  const res = await api.get(`/roomreservations/${id}`);
  return res.data;
};

export const deleteRoomReservation = async (id: string): Promise<void> => {
  await api.delete(`/roomreservations/${id}`);
};

export const updateRoomReservationReception = async ({
  id,
  roomReservation,
}: {
  id: string;
  roomReservation: SimpleRoomReservationStruct;
}) => {
  await api.put(`/reception/updateRoomRes/${id}`, roomReservation);
};

export const createRoomResGuest = async ({
  roomReservation,
}: {
  roomReservation: SimpleRoomResCreateStruct;
}): Promise<void> => {
  await api.post(`/roomreservations/`, roomReservation);
};
