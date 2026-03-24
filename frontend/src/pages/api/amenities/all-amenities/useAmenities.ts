import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityStruct } from "../../structs/AmenityStruct";
import { fetchAmenitiesQueryFn } from "./fetchAmenitiesQueryFn";

export const useAmenities = () => {
  //   const queryClient = useQueryClient();

  const { data: amenities = [], isLoading } = useQuery<AmenityStruct[]>({
    queryKey: [QUERY_KEYS.AMENITY.AMENITIES],
    queryFn: fetchAmenitiesQueryFn,
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
