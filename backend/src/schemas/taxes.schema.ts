import { z } from "zod";

export const taxesSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  touristTaxAd: z.number(),
  touristTaxCh: z.number(),
});

export const taxesSimpleSchema = z.object({
  touristTaxAd: z.number(),
  touristTaxCh: z.number(),
});
