import mongoose from "mongoose";

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
    roomType: {
      type: String,
      required: true,
    },
    bedNum: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const RoomReservation = mongoose.model(
  "room_reservations",
  roomReservationMongooseSchema,
);

export default RoomReservation;
