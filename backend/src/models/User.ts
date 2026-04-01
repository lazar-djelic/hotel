import mongoose from "mongoose";
import { USER_ROLE } from "../utils/enums.ts";

const userMongooseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      USER_ROLE.guest,
      USER_ROLE.admin,
      USER_ROLE.receptionist,
      USER_ROLE.staff,
    ],
    default: USER_ROLE.guest,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
  },
});

const User = mongoose.model("User", userMongooseSchema);

export default User;
