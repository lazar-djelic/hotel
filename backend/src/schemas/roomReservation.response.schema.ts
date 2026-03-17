import { z } from "zod";

export const roomReservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: z.any().transform((val) => val.toString()),
  startDate: z.date(),
  endDate: z.date(),
  roomType: z.string(),
  bedNum: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roomReservationArraySchema = z.array(roomReservationSchema);

export const roomReservationSimpleSchema = z.object({
  guest: z.any().transform((val) => val.toString()),
  startDate: z.date(),
  endDate: z.date(),
  roomType: z.string(),
  bedNum: z.string(),
});

export const roomReservationReceptionSimpleSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  phone: z.number(),
  email: z.string(),
  address: z.string(),
  personalID: z.number(),
  birthDate: z.coerce.date(),
  notes: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  roomType: z.string(),
  bedNum: z.string(),
});
