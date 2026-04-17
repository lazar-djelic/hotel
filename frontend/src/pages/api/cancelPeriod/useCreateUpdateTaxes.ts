import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../config/query-keys";
import type { SimpleCancelPeriodStruct } from "../structs/CancelPeriodStruct";
import {
  cancelPeriodSchema,
  cancelPeriodSimpleSchema,
} from "../../../schemas/cancelPeriod.response.schema";

export const useCreateUpdateCancelPeriod = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (data: SimpleCancelPeriodStruct) => {
      const payload = cancelPeriodSimpleSchema.parse(data);

      const res = await api.post("/cancel", payload);

      const parsedResponse = cancelPeriodSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create/update cancel period API response",
          parsedResponse.error,
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success(t("toast.cancelcrsucc"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CANCEL.PERIOD] });
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("toast.cancelcrfail"));
    },
  });

  return mutation;
};
