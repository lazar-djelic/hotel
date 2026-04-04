import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { updateAmenity } from "../amenities.api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useUpdateAmenity = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAmenity,
    onSuccess: (_, { id, amenity }) => {
      queryClient.setQueryData([QUERY_KEYS.AMENITY.AMENITY, id], amenity);

      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });

      queryClient.setQueryData([QUERY_KEYS.AMENITY.AMENITIES], (old: any) => {
        if (!old) return old;

        return old.map((r: any) => (r._id === id ? { ...r, ...amenity } : r));
      });

      toast.success(t("toast.amupsucc"));
      navigate(ROUTES.ADMIN.AMENITIES);
    },
    onError: () => {
      toast.error(t("toast.amupfail"));
    },
  });

  return {
    mutate,
    isPending,
  };
};
