import mongoose from "mongoose";

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
      required: true,
    },
    bednum: {
      type: String,
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
      required: true,
    },
    balcony: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    housekeeping: {
      type: String,
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
  },
  { timestamps: true },
);

const Room = mongoose.model("Room", roomMongooseSchema);

export default Room;
