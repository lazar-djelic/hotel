import type { SetURLSearchParams } from "react-router-dom";
import { roomReservationArraySchema } from "../../../schemas/roomReservation.response.schema";
import { fetchReservations as fetchRoomReservations } from "../../api/reservations/reservations.api";
import type { RangeType } from "../../interfaces/RangeType";

export const fetchRoomReservationsQueryFn = async (
  dateRange: RangeType,
  option: string,
  setSearchParams: SetURLSearchParams,
) => {
  if (dateRange.startDate && dateRange.endDate) {
    setSearchParams({
      startDate: dateRange.startDate.toISOString(),
      endDate: dateRange.endDate.toISOString(),
    });
  }

  if (option !== "room") {
    return [];
  }

  const rawReservations = await fetchRoomReservations(dateRange);
  const parsed = roomReservationArraySchema.safeParse(rawReservations);
  if (!parsed.success) {
    console.error("Invalid reservation data", parsed.error.issues);
    return [];
  }
  return parsed.data;
};
