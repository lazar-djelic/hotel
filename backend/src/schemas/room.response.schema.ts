import { z } from "zod";
import {
  BED_OPTIONS,
  HOUSEKEEPING_OPTIONS,
  ROOM_STATUS,
  ROOM_TYPES,
  VIEW_OPTIONS,
} from "../utils/enums.ts";
import { staySchema } from "./stay.response.schema.ts";
import type { Room } from "../types/RoomType.ts";

export const roomSchema: z.ZodType<Room> = z.object({
  _id: z.any().transform((val) => val.toString()),
  floor: z.number(),
  roomnum: z.number(),
  type: z.enum([
    ROOM_TYPES.standard,
    ROOM_TYPES.deluxe,
    ROOM_TYPES.suite,
    ROOM_TYPES.penthouse,
  ]),
  bednum: z.enum([BED_OPTIONS.single, BED_OPTIONS.double, BED_OPTIONS.twin]),
  smoking: z.boolean(),
  accessibility: z.boolean(),
  view: z.enum([
    VIEW_OPTIONS.city,
    VIEW_OPTIONS.garden,
    VIEW_OPTIONS.sea,
    VIEW_OPTIONS.none,
  ]),
  balcony: z.boolean(),
  status: z.enum([
    ROOM_STATUS.available,
    ROOM_STATUS.reserved,
    ROOM_STATUS.occupied,
    ROOM_STATUS.outofservice,
  ]),
  housekeeping: z.enum([
    HOUSEKEEPING_OPTIONS.clean,
    HOUSEKEEPING_OPTIONS.dirty,
    HOUSEKEEPING_OPTIONS.in_progress,
    HOUSEKEEPING_OPTIONS.inspected,
  ]),
  lastcleaned: z.date(),
  linkedroom: z.boolean(),
  pets: z.boolean(),
  currentStay: z.lazy(() => staySchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roomArraySchema = z.array(roomSchema);

export const roomSimpleSchema = z.object({
  floor: z.number(),
  roomnum: z.number(),
  type: z.enum([
    ROOM_TYPES.standard,
    ROOM_TYPES.deluxe,
    ROOM_TYPES.suite,
    ROOM_TYPES.penthouse,
  ]),
  bednum: z.enum([BED_OPTIONS.single, BED_OPTIONS.double, BED_OPTIONS.twin]),
  smoking: z.boolean(),
  accessibility: z.boolean(),
  view: z.enum([
    VIEW_OPTIONS.city,
    VIEW_OPTIONS.garden,
    VIEW_OPTIONS.sea,
    VIEW_OPTIONS.none,
  ]),
  balcony: z.boolean(),
  status: z.enum([
    ROOM_STATUS.available,
    ROOM_STATUS.reserved,
    ROOM_STATUS.occupied,
    ROOM_STATUS.outofservice,
  ]),
  housekeeping: z.enum([
    HOUSEKEEPING_OPTIONS.clean,
    HOUSEKEEPING_OPTIONS.dirty,
    HOUSEKEEPING_OPTIONS.in_progress,
    HOUSEKEEPING_OPTIONS.inspected,
  ]),
  lastcleaned: z.date(),
  linkedroom: z.boolean(),
  pets: z.boolean(),
  currentStay: z.any().transform((val) => val.toString()),
});
