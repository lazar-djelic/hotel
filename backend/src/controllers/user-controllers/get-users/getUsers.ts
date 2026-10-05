import type { Response, NextFunction } from "express";
import type { GetUsersRequest } from "./types.ts";
import User from "../../../models/User.ts";
import { getUsersSchema } from "../../../schemas/user.response.schema.ts";

export async function getUsers(
  _req: GetUsersRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await User.find()
      .select("-password")
      .populate("guest")
      .sort({ email: 1 })
      .lean();
    const parsed = getUsersSchema.safeParse(users);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getUsers controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
