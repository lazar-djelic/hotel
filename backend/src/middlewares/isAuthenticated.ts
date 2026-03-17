import { type Request, type Response, type NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.userId) {
    return res.json({ user: null, authenticated: false });
  }
  next();
};
