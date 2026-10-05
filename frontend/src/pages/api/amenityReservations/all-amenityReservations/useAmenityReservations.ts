import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityReservationStruct } from "../../structs/AmenityReservation";
import type { RangeType } from "../../../interfaces/RangeType";
import type { SetURLSearchParams } from "react-router";
import { fetchAmenityReservations } from "../amenityReservations.api";
import { amenityReservationArraySchema } from "../../../../schemas/amenityReservation.response.schema";

export const useAmenityReservations = (
  dateRange: RangeType,
  option: string,
  setSearchParams: SetURLSearchParams,
) => {
  const { data: reservations = [], isLoading } = useQuery<
    AmenityReservationStruct[]
  >({
    queryKey: [
      QUERY_KEYS.AM_RES.RESERVATIONS,
      QUERY_KEYS.AMENITY.AMENITIES,
      dateRange,
      option,
    ],
    queryFn: async () => {
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
    },
  });

  return {
    reservations,
    loading: isLoading,
  };
};
