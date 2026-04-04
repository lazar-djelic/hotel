import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAmenity } from "../amenities.api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { SimpleAmenityStruct } from "../../structs/AmenityStruct";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateAmenity = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SimpleAmenityStruct) => createAmenity(data),
    onSuccess: () => {
      toast.success(t("toast.amcrsucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AMENITY.AMENITIES],
      });
      navigate(ROUTES.ADMIN.AMENITIES);
    },
    onError: () => {
      toast.error(t("toast.amcrfail"));
    },
  });

  return { mutate, isPending };
};
