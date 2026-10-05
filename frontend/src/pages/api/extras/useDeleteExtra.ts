import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { NavigateFunction } from "react-router";
import { deleteExtra } from "./extras.api";
import { QUERY_KEYS } from "../../../config/query-keys";
import toast from "react-hot-toast";
import { ROUTES } from "../../../config/routes";

export const useDeleteExtra = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationFn: deleteExtra,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXTRAS.EXTRAS] });
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.EXTRAS.EXTRA, id] });

      toast.success(t("toast.extradelsucc"));
      navigate(ROUTES.ADMIN.EXTRAS);
    },
    onError: () => {
      toast.error(t("toast.extradelfail"));
    },
  });

  return { deleteExtra: mutate };
};
