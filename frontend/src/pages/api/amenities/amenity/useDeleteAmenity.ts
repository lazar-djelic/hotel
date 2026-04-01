import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { deleteAmenity } from "../amenities.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import { ROUTES } from "../../../../config/routes";

export const useDeleteAmenity = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: deleteAmenity,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AMENITY.AMENITIES],
      });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.AMENITY.AMENITY, id] });

      toast.success("Amenity deleted successfully!");
      navigate(ROUTES.ADMIN.AMENITIES);
    },
    onError: () => {
      toast.error("Failed to delete the amenity!");
    },
  });

  return { deleteAmenity: mutate, isDeleting: isPending || isSuccess };
};
