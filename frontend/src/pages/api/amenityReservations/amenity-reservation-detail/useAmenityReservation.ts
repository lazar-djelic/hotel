import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityReservationStruct } from "../../structs/AmenityReservation";
import { fetchAmenityReservationQueryFn } from "./fetchAmenityReservationQueryFn";
import { useMemo } from "react";
import { createEmptyAmenityReservation } from "./createEmptyAmenityReservation";

export const useAmenityReservation = (id: string) => {
  const query = useQuery<AmenityReservationStruct>({
    queryKey: [QUERY_KEYS.AM_RES.RESERVATION, id],
    queryFn: () => fetchAmenityReservationQueryFn(id!),
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
