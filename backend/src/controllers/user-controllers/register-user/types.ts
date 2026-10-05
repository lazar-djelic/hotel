import { z } from "zod";
import type { Request } from "express";

export const RegisterUserRequestSchema = {
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type RegisterUserRequest = Request<
  z.infer<typeof RegisterUserRequestSchema.params>,
  {},
  z.infer<typeof RegisterUserRequestSchema.body>,
  z.infer<typeof RegisterUserRequestSchema.query>
>;
