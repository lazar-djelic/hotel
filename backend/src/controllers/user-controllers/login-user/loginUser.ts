import { type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../../../models/User.ts";
import type { LoginUserRequest } from "./types.ts";

export async function loginUser(
  req: LoginUserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.userId = user._id.toString();
    req.session.role = user.role;

    res.json({ message: "Logged in" });
  } catch (error) {
    console.error("Error in loginUser controller", error);
    res.status(500).json({ message: "Server error" });
  }
}
