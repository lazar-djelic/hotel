import type { SetURLSearchParams } from "react-router-dom";
import { reservationArraySchema } from "../../schemas/reservation.response.schema";
import { fetchReservations } from "../api/reservations/reservations.api";
import type { RangeType } from "../interfaces/RangeType";

export const fetchReservationsQueryFn = async (
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

  const rawReservations = await fetchReservations(dateRange);
  const parsed = reservationArraySchema.safeParse(rawReservations);
  if (!parsed.success) {
    console.error("Invalid reservation data", parsed.error);
    return [];
  }
  return parsed.data;
};
