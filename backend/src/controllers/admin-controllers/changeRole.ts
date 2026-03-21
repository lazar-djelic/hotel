import { type Response, type NextFunction } from "express";
import { roleSimpleSchema, type roleRequest } from "./types.ts";
import User from "../../models/User.ts";

export async function changeRole(
  req: roleRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = roleSimpleSchema.parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { role: parsed.role },
      {
        new: true,
      },
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error in changeRole controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
