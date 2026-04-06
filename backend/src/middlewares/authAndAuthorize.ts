import { type Request, type Response, type NextFunction } from "express";
import type { Role } from "../utils/enums.ts";
import User from "../models/User.ts";

export const authenAndAuthorize =
  <T extends Request<any, any, any, any>>(allowedRoles: Role[]) =>
  async (req: T, res: Response, next: NextFunction) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Unauthorized userId" });
    }

    const user = await User.findById(req.session.userId).select("role");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("User role:", user.role, "Allowed roles:", allowedRoles);

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
