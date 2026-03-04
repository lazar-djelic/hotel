import { z } from "zod";
import type { Request } from "express";

export const LoginUserRequestSchema = {
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type LoginUserRequest = Request<
  z.infer<typeof LoginUserRequestSchema.params>,
  {},
  z.infer<typeof LoginUserRequestSchema.body>,
  z.infer<typeof LoginUserRequestSchema.query>
>;
