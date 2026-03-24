import api from "../../../lib/axios";
import type { RangeType } from "../../interfaces/RangeType";
import { formatDate } from "../reservations/formatDate";
import type {
  AmenityReservationStruct,
  SimpleAmenityCreateReservationReceptionStruct,
  SimpleAmenityReservationStruct,
} from "../structs/AmenityReservation";
import type { SimpleGuestStruct } from "../structs/GuestStruct";

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
}): Promise<void> => {
  await api.post(`/reception/amenityreservations/${id}`, amenityReservation);
};

type WithoutDateAndGuest = Omit<
  SimpleAmenityCreateReservationReceptionStruct,
  "date" | "guest"
>;
export const createGuestAndAmResRec = async ({
  id,
  amenityReservation,
}: {
  id: string;
  amenityReservation: WithoutDateAndGuest;
}): Promise<void> => {
  await api.post(`/reception/user-amenityreservations/${id}`, {
    ...amenityReservation,
  });
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
