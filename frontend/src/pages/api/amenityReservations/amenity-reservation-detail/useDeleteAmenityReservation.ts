import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { deleteAmenityReservation } from "../amenityReservations.api";

export const useDeleteAmenityReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteAmenityReservation,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATION, id],
      });

      toast.success("Amenity reservation deleted successfully!");
      navigate("/reception/amenity-reservations");
    },
    onError: () => {
      toast.error("Failed to delete the amenity reservation!");
    },
  });

  return { deleteAmenityReservation: mutate };
};
