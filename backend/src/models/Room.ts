import mongoose from "mongoose";
import {
  BED_OPTIONS,
  CURRENCIES,
  HOUSEKEEPING_OPTIONS,
  ROOM_STATUS,
  ROOM_TYPES,
  VIEW_OPTIONS,
} from "../utils/enums.ts";

const roomMongooseSchema = new mongoose.Schema(
  {
    floor: {
      type: Number,
      required: true,
    },
    roomnum: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: [
        ROOM_TYPES.standard,
        ROOM_TYPES.deluxe,
        ROOM_TYPES.suite,
        ROOM_TYPES.penthouse,
      ],
      required: true,
    },
    bednum: {
      type: String,
      enum: [BED_OPTIONS.single, BED_OPTIONS.double, BED_OPTIONS.twin],
      required: true,
    },
    smoking: {
      type: Boolean,
      required: true,
    },
    accessibility: {
      type: Boolean,
      required: true,
    },
    view: {
      type: String,
      enum: [
        VIEW_OPTIONS.city,
        VIEW_OPTIONS.garden,
        VIEW_OPTIONS.sea,
        VIEW_OPTIONS.none,
      ],
      required: true,
    },
    balcony: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: [
        ROOM_STATUS.available,
        ROOM_STATUS.reserved,
        ROOM_STATUS.occupied,
        ROOM_STATUS.outofservice,
      ],
      required: true,
    },
    housekeeping: {
      type: String,
      enum: [
        HOUSEKEEPING_OPTIONS.clean,
        HOUSEKEEPING_OPTIONS.dirty,
        HOUSEKEEPING_OPTIONS.in_progress,
        HOUSEKEEPING_OPTIONS.inspected,
      ],
      required: true,
    },
    lastcleaned: {
      type: Date,
      required: true,
    },
    linkedroom: {
      type: Boolean,
      required: true,
    },
    pets: {
      type: Boolean,
      required: true,
    },
    currentStay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      default: null,
    },
    rate: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: [CURRENCIES.eur, CURRENCIES.rsd],
      required: true,
    },
    photos: {
      type: [String],
      required: false,
      default: [],
    },
  },
  { timestamps: true },
);

const Room = mongoose.model("Room", roomMongooseSchema);

export default Room;
