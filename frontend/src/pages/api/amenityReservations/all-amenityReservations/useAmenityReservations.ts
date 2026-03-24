import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenityReservationStruct } from "../../structs/AmenityReservation";
import { fetchAmenityReservationsQueryFn } from "./fetchAmenityReservationsQueryFn";
import type { RangeType } from "../../../interfaces/RangeType";
import type { SetURLSearchParams } from "react-router";

export const useAmenityReservations = (
  dateRange: RangeType,
  option: string,
  setSearchParams: SetURLSearchParams,
) => {
  //   const queryClient = useQueryClient();

  const { data: reservations = [], isLoading } = useQuery<
    AmenityReservationStruct[]
  >({
    queryKey: [
      QUERY_KEYS.AM_RES.RESERVATIONS,
      QUERY_KEYS.AMENITY.AMENITIES,
      dateRange,
      option,
    ],
    queryFn: () =>
      fetchAmenityReservationsQueryFn(dateRange, option, setSearchParams),
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
    reservations,
    loading: isLoading,
    // removeAmenity,
  };
};
