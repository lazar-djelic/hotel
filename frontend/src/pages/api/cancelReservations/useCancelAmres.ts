import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { cancelAmres } from "./cancelReservations.api";
import { QUERY_KEYS } from "../../../config/query-keys";

export const useCancelAmres = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: mutateCancelA, isPending } = useMutation({
    mutationFn: cancelAmres,
    onSuccess: () => {
      toast.success(t("toast.rescancelsucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AM_RES.RESERVATIONS],
      });
    },
    onError: () => toast.error(t("toast.rescancelfail")),
  });

  return { mutateCancelA, isPending };
};
