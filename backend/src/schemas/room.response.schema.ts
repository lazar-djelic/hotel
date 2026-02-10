import { z } from "zod";

export const roomSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  floor: z.number(),
  roomnum: z.number(),
  type: z.string(),
  bednum: z.string(),
  smoking: z.boolean(),
  accessibility: z.boolean(),
  view: z.string(),
  balcony: z.boolean(),
  status: z.string(),
  housekeeping: z.string(),
  lastcleaned: z.date(),
  linkedroom: z.boolean(),
  pets: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roomArraySchema = z.array(roomSchema);

export const roomSimpleSchema = z.object({
  floor: z.number(),
  roomnum: z.number(),
  type: z.string(),
  bednum: z.string(),
  smoking: z.boolean(),
  accessibility: z.boolean(),
  view: z.string(),
  balcony: z.boolean(),
  status: z.string(),
  housekeeping: z.string(),
  lastcleaned: z.date(),
  linkedroom: z.boolean(),
  pets: z.boolean(),
});
