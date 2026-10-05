import mongoose from "mongoose";

const guestMongooseSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    personalID: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Guest = mongoose.model("Guest", guestMongooseSchema);

export default Guest;
