import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityStruct } from "../../structs/AmenityStruct";
import { fetchAmenities } from "../amenities.api";
import { amenityArraySchema } from "../../../../schemas/amenity.response.schema";

export const useAmenities = () => {
  //   const queryClient = useQueryClient();

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

  //   const { mutate: removeAmenity } = useMutation({
  //     mutationFn: deleteAmenity,
  //     onSuccess: (_, id) => {
  //       queryClient.setQueryData<AmenityStruct[]>(["amenities"], (old) =>
  //         old ? old.filter((a) => a._id !== id) : [],
  //       );
  //       toast.success("Amenity deleted successfully!");
  //     },
  //     onError: () => {
  //       toast.error("Failed to delete the amenity!");
  //     },
  //   });

  return {
    amenities,
    loading: isLoading,
    // removeAmenity,
  };
};
