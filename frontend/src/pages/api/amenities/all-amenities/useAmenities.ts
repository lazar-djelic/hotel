import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityStruct } from "../../structs/AmenityStruct";
import { fetchAmenities } from "../amenities.api";
import { amenityArraySchema } from "../../../../schemas/amenity.response.schema";

export const useAmenities = () => {
  const { data: amenities = [], isLoading } = useQuery<AmenityStruct[]>({
    queryKey: [QUERY_KEYS.AMENITY.AMENITIES],
    queryFn: async () => {
      const rawAmenities = await fetchAmenities();
      const parsed = amenityArraySchema.safeParse(rawAmenities);
      if (!parsed.success) {
        console.error("Invalid amenities data", parsed.error.issues);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    amenities,
    loading: isLoading,
  };
};
