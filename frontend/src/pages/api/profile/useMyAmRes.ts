import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../config/query-keys";
import type { MyAmenityReservationStruct } from "../structs/AmenityReservation";
import { fetchMyAmRes } from "./profile.api";
import { getAmenityReservationArraySchema } from "../../../schemas/amenityReservation.response.schema";

export const useMyAmRes = () => {
  const { data: amres = [], isLoading } = useQuery<
    MyAmenityReservationStruct[]
  >({
    queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
    queryFn: async () => {
      const rawRes = await fetchMyAmRes();
      const parsed = getAmenityReservationArraySchema.safeParse(rawRes);
      if (!parsed.success) {
        console.error("Invalid amenity reservation data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    amres,
    loadingAm: isLoading,
  };
};
