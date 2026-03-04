import mongoose from "mongoose";

export type UserRole = "guest" | "admin" | "receptionist" | "housekeeping";

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
    enum: ["guest", "admin", "receptionist", "housekeeping"],
    default: "guest",
  },
});

const User = mongoose.model("User", userMongooseSchema);

export default User;
