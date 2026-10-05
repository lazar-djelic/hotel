import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import {
  roomSimpleSchema,
  type roomSimpleSchemaType,
} from "../../../../schemas/room.response.schema";
import api from "../../../../lib/axios";
import { ROUTES } from "../../../../config/routes";
import { useTranslation } from "react-i18next";

export const useCreateRoom = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (data: roomSimpleSchemaType) => {
      const payload = roomSimpleSchema.parse(data);

      const res = await api.post("/rooms", payload);

      const parsedResponse = roomSimpleSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error("Invalid create room API response", parsedResponse.error);
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success(t("toast.roomcrsucc"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM.ROOM] });
      navigate(ROUTES.ADMIN.ROOMS);
    },
    onError: () => {
      toast.error(t("toast.roomcrfail"));
    },
  });

  return mutation;
};
