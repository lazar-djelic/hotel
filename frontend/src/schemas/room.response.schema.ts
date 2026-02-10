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
  lastcleaned: z.string(),
  linkedroom: z.boolean(),
  pets: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const roomArraySchema = z.array(roomSchema);

export const roomSimpleSchema = z.object({
  floor: z
    .number()
    .min(1, "Floor is required")
    .max(20, "Floor must be less than 20"),
  roomnum: z
    .number()
    .min(1, "Room number is required")
    .max(10000, "Room number must be less than 10000"),
  type: z
    .string()
    .min(1, "Type is required")
    .max(10, "Type must be less than 10 characters"),
  bednum: z
    .string()
    .min(1, "Number of beds is required")
    .max(10, "Number of beds must be less than 10 characters"),
  smoking: z.boolean(),
  accessibility: z.boolean(),
  view: z
    .string()
    .min(1, "View is required")
    .max(10, "View must be less than 10 characters"),
  balcony: z.boolean(),
  status: z
    .string()
    .min(1, "Status is required")
    .max(20, "Status must be less than 20 characters"),
  housekeeping: z
    .string()
    .min(1, "Housekeeping is required")
    .max(10, "Housekeeping must be less than 10 characters"),
  lastcleaned: z
    .string()
    .min(1, "Last cleaned date is required")
    .max(25, "Last cleaned date must be less than 25 characters"),
  linkedroom: z.boolean(),
  pets: z.boolean(),
});

export type roomSimpleSchemaType = z.infer<typeof roomSimpleSchema>;
