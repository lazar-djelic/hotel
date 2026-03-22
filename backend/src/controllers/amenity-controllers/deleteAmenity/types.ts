import { z } from "zod";
import type { Request } from "express";

export const DeleteAmenityRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteAmenityRequest = Request<
  z.infer<typeof DeleteAmenityRequestSchema.params>,
  {},
  z.infer<typeof DeleteAmenityRequestSchema.body>,
  z.infer<typeof DeleteAmenityRequestSchema.query>
>;
