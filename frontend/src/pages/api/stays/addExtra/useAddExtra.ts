import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SimpleExtraStruct } from "../../structs/ExtraStruct";
import type { Stay } from "../../../../types/StayType";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { staySchema } from "../../../../schemas/stay.response.schema";
import toast from "react-hot-toast";
import { addExtra } from "../stays.api";
import { useTranslation } from "react-i18next";

export const useAddExtra = (
  id: string,
  extra: SimpleExtraStruct,
  onSuccess?: (updatedStay: Stay) => void,
) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => addExtra({ id, extra }),
    onSuccess: (data) => {
      const parsed = staySchema.safeParse(data);
      if (!parsed.success) {
        console.error("Failed to parse updated stay", parsed.error);
        return;
      }

      queryClient.setQueryData([QUERY_KEYS.STAYS.STAY, id], parsed.data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAYS.STAYS] });

      if (onSuccess) {
        onSuccess(parsed.data);
      }

      toast.success(t("toast.extracrsucc"));
    },
    onError: () => {
      toast.error(t("toast.extracrfail"));
    },
  });

  return {
    addExtra: mutate,
    loadingUpdate: isPending,
  };
};
