import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";

export const usePaymentAmres = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (amresId: string) => {
      const res = await api.post("/payments/create-checkout-session-amres", {
        amresId,
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
