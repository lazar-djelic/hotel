import { type Request, type Response, type NextFunction } from "express";

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", { path: "/" });
    req.session = null as any;

    return res.status(200).json({ message: "Logged out" });
  });
}
