import api from "../../../lib/axios";
import type { RangeType } from "../../interfaces/RangeType";
import { formatDate } from "../roomReservations/formatDate";
import type {
  AmenityReservationStruct,
  SimpleAmResCreateReceptionStruct,
  SimpleAmenityReservationStruct,
} from "../structs/AmenityReservation";

export const fetchAmenityReservations = async (
  dateRange: RangeType,
  option: string,
): Promise<AmenityReservationStruct[]> => {
  if (option === "") return [];

  const sDate = formatDate(dateRange.startDate);
  const eDate = formatDate(dateRange.endDate);

  const res = await api.get("/amenityreservations/" + option, {
    params: { startDate: sDate, endDate: eDate },
  });
  return res.data;
};

export const deleteAmenityReservation = async (id: string): Promise<void> => {
  await api.delete(`/amenityreservations/${id}`);
};

export const createAmenityResRec = async ({
  id,
  amenityReservation,
}: {
  id: string;
  amenityReservation: SimpleAmenityReservationStruct;
}): Promise<AmenityReservationStruct> => {
  const res = await api.post(
    `/reception/amenityreservations/${id}`,
    amenityReservation,
  );
  return res.data;
};

export const createAmResGuest = async ({
  id,
  amenityReservation,
}: {
  id: string;
  amenityReservation: SimpleAmenityReservationStruct;
}): Promise<AmenityReservationStruct> => {
  const res = await api.post(`/amenityreservations/${id}`, amenityReservation);
  return res.data;
};

type WithoutSomeProperties = Omit<
  SimpleAmResCreateReceptionStruct,
  "date" | "guest" | "_id" | "createdAt" | "updatedAt" | "payNow"
>;
export const createGuestAndAmResRec = async ({
  id,
  amenityReservation,
}: {
  id: string;
  amenityReservation: WithoutSomeProperties;
}): Promise<AmenityReservationStruct> => {
  const res = await api.post(`/reception/guest-amenityreservations/${id}`, {
    ...amenityReservation,
  });
  return res.data;
};

export const fetchAmenityReservation = async (
  id: string,
): Promise<AmenityReservationStruct> => {
  const res = await api.get(`/amenityreservations/one/${id}`);
  return res.data;
};

export const updateAmenityReservationReception = async ({
  id,
  amenityReservation,
}: {
  id: string;
  amenityReservation: SimpleAmenityReservationStruct;
}) => {
  await api.put(`/reception/updateAmenityRes/${id}`, amenityReservation);
};
