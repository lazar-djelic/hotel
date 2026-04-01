import { useQuery } from "@tanstack/react-query";
import type { AmenityStruct } from "../../structs/AmenityStruct";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { fetchAmenity } from "../amenities.api";
import { amenitySchema } from "../../../../schemas/amenity.response.schema";
import type { AxiosError } from "axios";

export const useAmenity = (id: string, enabled: boolean = true) => {
  const { data: amenity, isLoading } = useQuery<AmenityStruct, AxiosError>({
    queryKey: [QUERY_KEYS.AMENITY.AMENITY, id],
    queryFn: async () => {
      const raw = await fetchAmenity(id);
      const parsed = amenitySchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid amenity data from API", parsed.error);
        throw new Error("Invalid amenity data");
      }

      return parsed.data;
    },
    enabled: !!id && enabled,
    retry: (failureCount, error) => {
      // Don't retry on 404 errors
      if (error?.response?.status === 404) {
        return false;
      }
      // Retry other errors up to 3 times
      return failureCount < 3;
    },
    throwOnError: false,
  });

  return { amenity, loading: isLoading };
};
