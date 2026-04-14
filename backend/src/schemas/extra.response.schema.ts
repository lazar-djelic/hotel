import { z } from "zod";

export const extraSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  nameEng: z.string(),
  nameSrb: z.string(),
  price: z.number(),
});

export const extraArraySchema = z.array(extraSchema);

export const extraSimpleSchema = z.object({
  nameEng: z.string(),
  nameSrb: z.string(),
  price: z.number(),
});
