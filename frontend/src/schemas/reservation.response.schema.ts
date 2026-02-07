import { z } from "zod";

export const reservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  fName: z.string(),
  lName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  roomType: z.string(),
  bedNum: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const reservationArraySchema = z.array(reservationSchema);

export const reservationSimpleSchema = z.object({
  fName: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  lName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .max(25, "Start date must be less than 25 characters"),
  endDate: z
    .string()
    .min(1, "End date is required")
    .max(25, "End date must be less than 25 characters"),
  roomType: z
    .string()
    .min(1, "Room type is required")
    .max(10, "Room type must be less than 10 characters"),
  bedNum: z
    .string()
    .min(1, "Number of beds is required")
    .max(10, "Number of beds must be less than 10 characters"),
});

export type reservationSimpleSchemaType = z.infer<
  typeof reservationSimpleSchema
>;
