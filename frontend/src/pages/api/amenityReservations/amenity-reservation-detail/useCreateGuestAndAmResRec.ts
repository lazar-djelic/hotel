import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { NavigateFunction } from "react-router-dom";
import { createGuestAndAmResRec } from "../amenityReservations.api";

export const useCreateGuestAndAmResRec = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createGuestAndAmResRec,
    onSuccess: () => {
      toast.success("Amenity reservation created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });
      navigate("/reception/amenity-reservations");
    },
    onError: () => {
      toast.error("Failed to create amenity reservation");
    },
  });

  return { mutate, isPending };
};
