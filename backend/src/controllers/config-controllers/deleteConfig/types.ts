import { z } from "zod";
import type { Request } from "express";

export const DeleteConfigRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type DeleteConfigRequest = Request<
  z.infer<typeof DeleteConfigRequestSchema.params>,
  {},
  z.infer<typeof DeleteConfigRequestSchema.body>,
  z.infer<typeof DeleteConfigRequestSchema.query>
>;
