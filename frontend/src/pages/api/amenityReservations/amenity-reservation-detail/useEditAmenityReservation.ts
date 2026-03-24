import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { updateAmenityReservationReception } from "../amenityReservations.api";

export const useEditAmenityReservation = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAmenityReservationReception,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATION, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });

      toast.success("Amenity reservation updated successfully!");
      navigate("/reception/reservations");
    },
    onError: () => {
      toast.error("Failed to update the amenity reservation");
    },
  });

  return {
    saveAmenityReservation: mutate,
    saving: isPending,
  };
};
