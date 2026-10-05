import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelRoomres } from "./cancelReservations.api";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../config/query-keys";

export const useCancelRoomres = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: mutateCancelR, isPending } = useMutation({
    mutationFn: cancelRoomres,
    onSuccess: () => {
      toast.success(t("toast.rescancelsucc"));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      });
    },
    onError: () => toast.error(t("toast.rescancelfail")),
  });

  return { mutateCancelR, isPending };
};
