import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOut } from "../stays.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useCheckOut = (
  navigate: (path: string) => void,
  id?: string,
  notes?: string,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => checkOut({ id: id || "", notes: notes || "" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAYS.STAYS] });

      toast.success(t("toast.checkoutsucc"));
      navigate("/");
    },
    onError: () => {
      toast.error(t("toast.checkoutfail"));
    },
  });

  return {
    checkOut: mutate,
    // loadingCheckOut: isPending,
  };
};
