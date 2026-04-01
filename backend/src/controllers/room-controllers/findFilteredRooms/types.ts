import { z } from "zod";
import type { Request } from "express";
import { BED_OPTIONS, ROOM_TYPES, VIEW_OPTIONS } from "../../../utils/enums.ts";

const optionalBooleanQueryParam = z.preprocess((value) => {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }

  return value;
}, z.boolean().optional());

export const SimpleFindFilteredRoomsRequestSchema = z.object({
  roomType: z.enum([
    ROOM_TYPES.standard,
    ROOM_TYPES.deluxe,
    ROOM_TYPES.suite,
    ROOM_TYPES.penthouse,
  ]),
  bedNum: z.enum([BED_OPTIONS.single, BED_OPTIONS.double, BED_OPTIONS.twin]),
  view: z
    .enum([
      VIEW_OPTIONS.city,
      VIEW_OPTIONS.garden,
      VIEW_OPTIONS.sea,
      VIEW_OPTIONS.none,
    ])
    .optional(),
  smoking: optionalBooleanQueryParam,
  accessibility: optionalBooleanQueryParam,
  balcony: optionalBooleanQueryParam,
  pets: optionalBooleanQueryParam,
});

export const FindFilteredRoomsRequestSchema = {
  body: SimpleFindFilteredRoomsRequestSchema,
  query: z.object({}),
  params: z.object({}),
};

export type FindFilteredRoomsRequest = Request<
  z.infer<typeof FindFilteredRoomsRequestSchema.params>,
  {},
  z.infer<typeof FindFilteredRoomsRequestSchema.body>,
  z.infer<typeof FindFilteredRoomsRequestSchema.query>
>;
