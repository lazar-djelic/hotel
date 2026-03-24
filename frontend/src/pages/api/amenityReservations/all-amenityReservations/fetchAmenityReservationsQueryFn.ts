import type { SetURLSearchParams } from "react-router";
import { amenityReservationArraySchema } from "../../../../schemas/amenityReservation.response.schema";
import type { RangeType } from "../../../interfaces/RangeType";
import { fetchAmenityReservations } from "../amenityReservations.api";

export const fetchAmenityReservationsQueryFn = async (
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

  const rawReservations = await fetchAmenityReservations(dateRange, option);
  const parsed = amenityReservationArraySchema.safeParse(rawReservations);
  if (!parsed.success) {
    console.error("Invalid amenity reservations data", parsed.error.issues);
    throw new Error(
      `Failed to parse amenity reservations: ${parsed.error.issues.map((issue) => issue.message).join(", ")}`,
    );
  }
  return parsed.data;
};
