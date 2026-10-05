import { useQuery } from "@tanstack/react-query";
import type { AmenityReservationStruct } from "../structs/AmenityReservation";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchAmenityReservation } from "../amenityReservations/amenityReservations.api";
import { amenityReservationSchema } from "../../../schemas/amenityReservation.response.schema";

export const useFullAmenityReservation = (id: string) => {
  const { data: amenityReservation, isLoading } =
    useQuery<AmenityReservationStruct>({
      queryKey: [QUERY_KEYS.AM_RES.RESERVATION, "full", id],
      queryFn: async () => {
        const raw = await fetchAmenityReservation(id);
        const parsed = amenityReservationSchema.safeParse(raw);

        if (!parsed.success) {
          console.error(
            "Invalid amenity reservation data from API",
            parsed.error,
          );
          throw new Error("Invalid amenity reservation data");
        }

        return parsed.data;
      },
      enabled: !!id,
    });

  return {
    amenityReservation,
    loading: isLoading,
  };
};
