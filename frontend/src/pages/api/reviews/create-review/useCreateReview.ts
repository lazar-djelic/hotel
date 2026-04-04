import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { QUERY_KEYS } from "../../../../config/query-keys";
import {
  reviewSimpleSchema,
  type reviewSimpleSchemaType,
} from "../../../../schemas/review.response.schema";
import api from "../../../../lib/axios";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateReview = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (data: reviewSimpleSchemaType) => {
      const payload = reviewSimpleSchema.parse(data);

      const res = await api.post("/reviews", payload);

      const parsedResponse = reviewSimpleSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create review API response",
          parsedResponse.error,
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success(t("toast.revcrsucc"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEW.REVIEWS] });
      navigate(ROUTES.ALL.REVIEWS);
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error(t("toast.revexists"));
      } else {
        toast.error(t("toast.revcrfail"));
      }
    },
  });

  return mutation;
};
