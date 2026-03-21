import { z } from "zod";
import { roomSchema } from "./room.response.schema.ts";
import { RESERVATION_STATUS } from "../utils/enums.ts";
import { guestSchema } from "./guest.response.schema.ts";

export const roomReservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: guestSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  adults: z.number().default(1),
  children: z.number().default(0),
  assignedRoom: roomSchema.nullable().optional(),
  resStatus: z.string().default(RESERVATION_STATUS.booked),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roomReservationArraySchema = z.array(roomReservationSchema);

export const roomReservationSimpleSchema = z.object({
  guest: z.any().transform((val) => val.toString()),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  roomType: z.string(),
  bedNum: z.string(),
  adults: z.number().optional().default(1),
  children: z.number().optional().default(0),
  smoking: z.boolean().optional(),
  accessibility: z.boolean().optional(),
  view: z.string().optional(),
  balcony: z.boolean().optional(),
  linkedRoom: z.boolean().optional(),
  pets: z.boolean().optional(),
});

export const roomReservationReceptionSimpleSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  personalID: z.string(),
  birthDate: z.coerce.date(),
  notes: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  roomType: z.string(),
  bedNum: z.string(),
  adults: z.number().optional().default(1),
  children: z.number().optional().default(0),
  smoking: z.boolean().optional(),
  accessibility: z.boolean().optional(),
  view: z.string().optional(),
  balcony: z.boolean().optional(),
  linkedRoom: z.boolean().optional(),
  pets: z.boolean().optional(),
});

export const updateRoomReservationSimpleSchema = z.object({
  guest: z.any().transform((val) => val.toString()),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  adults: z.number(),
  children: z.number(),
  assignedRoom: z
    .any()
    .nullable()
    .optional()
    .transform((val) => val.toString()),
  resStatus: z.string(),
});
