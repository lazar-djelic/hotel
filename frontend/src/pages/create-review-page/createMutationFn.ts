import api from "../../lib/axios";
import {
  reviewSimpleSchema,
  type reviewSimpleSchemaType,
} from "../../schemas/review.response.schema";

export const createMutationFn = async (data: reviewSimpleSchemaType) => {
  const payload = reviewSimpleSchema.parse(data);

  const res = await api.post("/reviews", payload);

  const parsedResponse = reviewSimpleSchema.safeParse(res.data);

  if (!parsedResponse.success) {
    console.error("Invalid create review API response", parsedResponse.error);
    throw new Error("Invalid server response");
  }

  return parsedResponse.data;
};
