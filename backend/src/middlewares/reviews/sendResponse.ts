import { type Request, type Response } from "express";

export function sendResponse(_req: Request, res: Response) {
  res.status(200).json(res.locals.data);
}
