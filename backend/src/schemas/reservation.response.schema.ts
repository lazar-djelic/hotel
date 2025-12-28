import { z } from "zod";

export const reservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  fName: z.string(),
  lName: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  room: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const reservationArraySchema = z.array(reservationSchema);

export const reservationSimpleSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  room: z.number(),
});
