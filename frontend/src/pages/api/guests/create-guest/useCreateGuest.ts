import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { Dispatch, SetStateAction } from "react";
import type { GuestStruct } from "../../structs/GuestStruct";
import {
  guestSimpleSchema,
  type guestSimpleSchemaType,
} from "../../../../schemas/guest.response.schema";
import api from "../../../../lib/axios";

export const useCreateGuest = (
  navigate: (path: string) => void,
  setForm: Dispatch<SetStateAction<GuestStruct | null>>,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: guestSimpleSchemaType) => {
      const payload = guestSimpleSchema.parse(data);

      const res = await api.post("/guests", payload, { withCredentials: true });

      const parsedResponse = guestSimpleSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create guest API response",
          parsedResponse.error,
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success("Guest created successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUEST] });

      queryClient.invalidateQueries({ queryKey: ["me"] });
      setForm(null);
      navigate("/profile");
    },
    onError: () => {
      toast.error("Failed to create a guest!");
    },
  });

  return mutation;
};
