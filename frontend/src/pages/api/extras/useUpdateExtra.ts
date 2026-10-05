import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { NavigateFunction } from "react-router";
import { updateExtra } from "./extras.api";
import { QUERY_KEYS } from "../../../config/query-keys";
import toast from "react-hot-toast";
import { ROUTES } from "../../../config/routes";

export const useUpdateExtra = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: updateExtra,
    onSuccess: (_, { id, extra }) => {
      queryClient.setQueryData([QUERY_KEYS.EXTRAS.EXTRA, id], extra);

      // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXTRAS.EXTRAS] });

      queryClient.setQueryData([QUERY_KEYS.EXTRAS.EXTRAS], (old: any) => {
        if (!old) return old;

        return old.map((e: any) => (e._id === id ? { ...e, ...extra } : e));
      });

      toast.success(t("toast.extraupsucc"));
      navigate(ROUTES.ADMIN.EXTRAS);
    },
    onError: () => {
      toast.error(t("toast.extraupfail"));
    },
  });

  return {
    saving: isPending,
    saveExtra: mutate,
  };
};
