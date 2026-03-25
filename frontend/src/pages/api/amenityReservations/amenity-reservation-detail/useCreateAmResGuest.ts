import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { NavigateFunction } from "react-router-dom";
import { createAmResGuest } from "../amenityReservations.api";

export const useCreateAmResGuest = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createAmResGuest,
    onSuccess: () => {
      toast.success("Amenity reservation created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });
      navigate("/profile");
    },
    onError: () => {
      toast.error("Failed to create amenity reservation");
    },
  });

  return { mutate, isPending };
};
