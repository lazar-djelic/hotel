import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityReservationStruct } from "../../structs/AmenityReservation";
import { useMemo } from "react";
import { createEmptyAmenityReservation } from "./createEmptyAmenityReservation";
import { fetchAmenityReservation } from "../amenityReservations.api";
import { amenityReservationSchema } from "../../../../schemas/amenityReservation.response.schema";

export const useAmenityReservation = (id: string) => {
  const query = useQuery<AmenityReservationStruct>({
    queryKey: [QUERY_KEYS.AM_RES.RESERVATION, id],
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
  });

  const emptyReservation = useMemo(() => createEmptyAmenityReservation(), []);

  return {
    amenityReservation: query.data
      ? {
          ...query.data,
          guest: query.data.guest._id,
          amenity: query.data.amenity._id,
        }
      : emptyReservation,
    loading: query.isLoading,
  };
};
