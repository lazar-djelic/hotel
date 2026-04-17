import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";

export const usePaymentRoomres = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (roomresId: string) => {
      const res = await api.post("/payments/create-checkout-session-roomres", {
        roomresId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });

  return { mutate, isPending };
};
