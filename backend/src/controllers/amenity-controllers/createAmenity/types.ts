import { z } from "zod";
import type { Request } from "express";
import { amenitySimpleSchema } from "../../../schemas/amenity.response.schema.ts";

export const CreateAmenityRequestSchema = {
  body: amenitySimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateAmenityRequest = Request<
  z.infer<typeof CreateAmenityRequestSchema.params>,
  {},
  z.infer<typeof CreateAmenityRequestSchema.body>,
  z.infer<typeof CreateAmenityRequestSchema.query>
>;
