import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { SimpleTaxesStruct } from "../structs/TaxesStruct";
import { taxesSchema, taxesSimpleSchema } from "../../../schemas/taxes.schema";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../config/query-keys";

export const useCreateUpdateTaxes = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (data: SimpleTaxesStruct) => {
      const payload = taxesSimpleSchema.parse(data);

      const res = await api.post("/taxes", payload);

      const parsedResponse = taxesSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create/update taxes API response",
          parsedResponse.error,
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success(t("toast.taxescrsucc"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TAXES.TAXES] });
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("toast.taxescrfail"));
    },
  });

  return mutation;
};
