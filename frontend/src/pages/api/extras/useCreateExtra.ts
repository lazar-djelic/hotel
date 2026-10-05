import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Extra } from "../../../types/StayType";
import {
  extraSchema,
  extraSimpleSchema,
} from "../../../schemas/extra.response.schema";
import { createExtra } from "./extras.api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../config/query-keys";
import { ROUTES } from "../../../config/routes";

export const useCreateExtra = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (extra: Extra) => {
      const payload = extraSimpleSchema.parse(extra);

      const res = await createExtra(payload);

      const parsedResponse = extraSchema.safeParse(res);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create extra API response",
          parsedResponse.error,
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success(t("toast.extracrsuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXTRAS.EXTRAS] });
      navigate(ROUTES.ADMIN.EXTRAS);
    },
    onError: () => {
      toast.error(t("toast.extracrfailed"));
    },
  });

  return mutation;
};
