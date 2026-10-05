import { type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../../../models/User.ts";
import { USER_ROLE } from "../../../utils/enums.ts";
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

    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;
    const role = isFirstUser ? USER_ROLE.admin : USER_ROLE.guest;

    const user = new User({
      email,
      password: hashedPassword,
      role,
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
