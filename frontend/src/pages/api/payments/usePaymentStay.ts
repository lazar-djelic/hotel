import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";

export const usePaymentStay = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (stayId: string) => {
      const res = await api.post("/payments/create-checkout-session-stay", {
        stayId,
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
