import api from "../../../../lib/axios";
import {
  guestSimpleSchema,
  type guestSimpleSchemaType,
} from "../../../../schemas/guest.response.schema";

export const createGuestMutationFn = async (data: guestSimpleSchemaType) => {
  const payload = guestSimpleSchema.parse(data);

  const res = await api.post("/guests", payload, { withCredentials: true });

  const parsedResponse = guestSimpleSchema.safeParse(res.data);

  if (!parsedResponse.success) {
    console.error("Invalid create guest API response", parsedResponse.error);
    throw new Error("Invalid server response");
  }

  return parsedResponse.data;
};
