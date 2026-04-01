import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAmenity } from "../amenities.api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { SimpleAmenityStruct } from "../../structs/AmenityStruct";
import { ROUTES } from "../../../../config/routes";

export const useCreateAmenity = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SimpleAmenityStruct) => createAmenity(data),
    onSuccess: () => {
      toast.success("Amenity created successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AMENITY.AMENITIES],
      });
      navigate(ROUTES.ADMIN.AMENITIES);
    },
    onError: () => {
      toast.error("Failed to create amenity");
    },
  });

  return { mutate, isPending };
};
