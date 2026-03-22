import { z } from "zod";
import type { Request } from "express";
import { amenitySimpleSchema } from "../../../schemas/amenity.response.schema.ts";

export const UpdateAmenityRequestSchema = {
  body: amenitySimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateAmenityRequest = Request<
  z.infer<typeof UpdateAmenityRequestSchema.params>,
  {},
  z.infer<typeof UpdateAmenityRequestSchema.body>,
  z.infer<typeof UpdateAmenityRequestSchema.query>
>;
