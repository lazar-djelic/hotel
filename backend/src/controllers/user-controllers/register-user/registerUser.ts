import { type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../../../models/User.ts";
import type { RegisterUserRequest } from "./types.ts";

export async function registerUser(
  req: RegisterUserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    req.session.userId = user._id.toString();
    req.session.role = user.role;

    res.status(201).json({
      message: "User registered and logged in",
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in registerUser controller", error);
    res.status(500).json({ message: "Server error" });
  }
}
