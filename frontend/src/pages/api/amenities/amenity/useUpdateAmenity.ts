import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { updateAmenity } from "../amenities.api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { ROUTES } from "../../../../config/routes";

export const useUpdateAmenity = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAmenity,
    onSuccess: (_, { id, amenity }) => {
      queryClient.setQueryData([QUERY_KEYS.AMENITY.AMENITY, id], amenity);

      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });

      queryClient.setQueryData([QUERY_KEYS.AMENITY.AMENITIES], (old: any) => {
        if (!old) return old;

        return old.map((r: any) => (r._id === id ? { ...r, ...amenity } : r));
      });

      toast.success("Amenity updated successfully!");
      navigate(ROUTES.ADMIN.AMENITIES);
    },
    onError: () => {
      toast.error("Failed to update the amenity");
    },
  });

  return {
    mutate,
    isPending,
  };
};
