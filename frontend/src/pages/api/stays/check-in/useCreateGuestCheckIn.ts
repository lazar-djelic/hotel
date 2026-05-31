import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import {
  guestSchema,
  guestSimpleSchema,
  type guestSimpleSchemaType,
} from "../../../../schemas/guest.response.schema";
import api from "../../../../lib/axios";
import type { SimpleStayCreateStruct } from "../../structs/StayStruct";
import type { GuestStruct } from "../../structs/GuestStruct";

interface UseCreateGuestProps {
  form: SimpleStayCreateStruct;
  setForm: (form: SimpleStayCreateStruct) => void;
  setGuestFound: (found: boolean) => void;
  setGuest: (data: GuestStruct) => void;
  t: (key: string) => string;
}

export const useCreateGuestCheckIn = ({
  form,
  setForm,
  setGuestFound,
  setGuest,
  t,
}: UseCreateGuestProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: guestSimpleSchemaType) => {
      const payload = guestSimpleSchema.parse(data);

      const res = await api.post("/guests", payload, { withCredentials: true });

      const parsedResponse = guestSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create guest API response",
          parsedResponse.error,
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: (guest) => {
      if (!guest) {
        toast.error(t("toast.guestnotfound"));
        return;
      }
      setForm({
        ...form,
        guest: guest._id,
      });
      setGuestFound(true);
      setGuest(guest);
      toast.success(t("toast.guestcrsucc"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUEST] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUESTS] });
    },
    onError: () => {
      toast.error(t("toast.guestcrfail"));
    },
  });

  return {
    createGuest: mutate,
    creating: isPending,
  };
};
