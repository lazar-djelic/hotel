import api from "../../../lib/axios";
import {
  roomSimpleSchema,
  type roomSimpleSchemaType,
} from "../../../schemas/room.response.schema";

export const createRoomMutationFn = async (data: roomSimpleSchemaType) => {
  const payload = roomSimpleSchema.parse(data);

  const res = await api.post("/rooms", payload);

  const parsedResponse = roomSimpleSchema.safeParse(res.data);

  if (!parsedResponse.success) {
    console.error("Invalid create room API response", parsedResponse.error);
    throw new Error("Invalid server response");
  }

  return parsedResponse.data;
};
