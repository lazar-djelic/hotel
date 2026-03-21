import { z } from "zod";
import type { Request } from "express";
import { updateStaySimpleSchema } from "../../../schemas/stay.response.schema.ts";

export const UpdateStayRequestSchema = {
  body: updateStaySimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateStayRequest = Request<
  z.infer<typeof UpdateStayRequestSchema.params>,
  {},
  z.infer<typeof UpdateStayRequestSchema.body>,
  z.infer<typeof UpdateStayRequestSchema.query>
>;
