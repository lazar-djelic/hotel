import { z } from "zod";
import { guestSchema } from "./guest.response.schema";
import { roomSchema } from "./room.response.schema";
import {
  BED_OPTIONS,
  RESERVATION_STATUS,
  ROOM_TYPES,
  VIEW_OPTIONS,
} from "../config/enums";
import type { RoomReservation } from "../types/RoomReservationType";

export const roomReservationSchema: z.ZodType<RoomReservation> = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: guestSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  adults: z.number().default(1),
  children: z.number().default(0),
  assignedRoom: z.lazy(() => roomSchema),
  resStatus: z
    .enum([
      RESERVATION_STATUS.booked,
      RESERVATION_STATUS.confirmed,
      RESERVATION_STATUS.checked_in,
      RESERVATION_STATUS.cancelled,
    ])
    .default(RESERVATION_STATUS.booked),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roomReservationArraySchema = z.array(roomReservationSchema);

export const roomReservationSimpleSchema = z.object({
  guest: z.any().transform((val) => val.toString()),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  roomType: z.enum([
    ROOM_TYPES.standard,
    ROOM_TYPES.deluxe,
    ROOM_TYPES.suite,
    ROOM_TYPES.penthouse,
  ]),
  bedNum: z.enum([BED_OPTIONS.single, BED_OPTIONS.double, BED_OPTIONS.twin]),
  adults: z.number().default(1),
  children: z.number().default(0),
  smoking: z.boolean(),
  accessibility: z.boolean(),
  view: z.enum([
    VIEW_OPTIONS.city,
    VIEW_OPTIONS.garden,
    VIEW_OPTIONS.sea,
    VIEW_OPTIONS.none,
  ]),
  balcony: z.boolean(),
  linkedRoom: z.boolean(),
  pets: z.boolean(),
});

export type roomReservationSimpleSchemaType = z.infer<
  typeof roomReservationSimpleSchema
>;
