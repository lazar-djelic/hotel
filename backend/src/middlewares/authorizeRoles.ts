import { type Request, type Response, type NextFunction } from "express";

type Role = "guest" | "admin" | "receptionist" | "staff";

export const authorizeRoles =
  (...allowedRoles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.session.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
