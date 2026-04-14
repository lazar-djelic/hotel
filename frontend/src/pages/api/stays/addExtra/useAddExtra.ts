import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SimpleAddExtraStruct } from "../../structs/ExtraStruct";
import type { Stay } from "../../../../types/StayType";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { staySchema } from "../../../../schemas/stay.response.schema";
import toast from "react-hot-toast";
import { addExtra } from "../stays.api";
import { useTranslation } from "react-i18next";

interface AddExtraParams {
  id: string;
  extra: SimpleAddExtraStruct;
}

export const useAddExtra = (onSuccess?: (updatedStay: Stay) => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, extra }: AddExtraParams) => addExtra({ id, extra }),
    onSuccess: (data, variables) => {
      const parsed = staySchema.safeParse(data);
      if (!parsed.success) {
        console.error("Failed to parse updated stay", parsed.error);
        return;
      }

      queryClient.setQueryData(
        [QUERY_KEYS.STAYS.STAY, variables.id],
        parsed.data,
      );
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
