import { type Request, type Response, type NextFunction } from "express";
import User from "../models/User.ts";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ authenticated: false });
    }

    const user = await User.findById(req.session.userId)
      .populate("guest")
      .select("-password");

    if (!user) {
      return res.json({
        authenticated: false,
      });
    }

    res.json({
      authenticated: true,
      // user: {
      //   id: user._id,
      //   email: user.email,
      //   role: user.role,
      // },
      user,
      guest: user?.guest,
    });
  } catch (error) {
    console.error("Error in getMe controller", error);
    res.status(500).json({ message: "Server error" });
  }
}
