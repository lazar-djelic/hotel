import { z } from "zod";
import type { Request } from "express";

export const GetAmenitiesRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetAmenitiesRequest = Request<
  z.infer<typeof GetAmenitiesRequestSchema.params>,
  {},
  z.infer<typeof GetAmenitiesRequestSchema.body>,
  z.infer<typeof GetAmenitiesRequestSchema.query>
>;
