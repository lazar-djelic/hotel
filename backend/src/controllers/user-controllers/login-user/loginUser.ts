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
    if (req.session.userId) {
      return res.status(400).json({ message: "User already logged in" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      req.session.userId = user._id.toString();
      req.session.role = user.role;
      if (user.guest) req.session.guest = user.guest.toString();

      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ message: "Session save error" });
        }

        res.json({ message: "Logged in" });
      });
    });
  } catch (error) {
    console.error("Error in loginUser controller", error);
    res.status(500).json({ message: "Server error" });
  }
}
