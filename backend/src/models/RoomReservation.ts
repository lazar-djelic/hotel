import mongoose from "mongoose";
import { RESERVATION_STATUS } from "../utils/enums.ts";

const roomReservationMongooseSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    assignedRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
    resStatus: {
      type: String,
      enum: [
        RESERVATION_STATUS.booked,
        RESERVATION_STATUS.confirmed,
        RESERVATION_STATUS.checked_in,
        RESERVATION_STATUS.cancelled,
      ],
      default: RESERVATION_STATUS.booked,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const RoomReservation = mongoose.model(
  "room_reservations",
  roomReservationMongooseSchema,
);

export default RoomReservation;
