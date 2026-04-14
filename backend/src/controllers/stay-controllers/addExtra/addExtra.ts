import { type Response, type NextFunction } from "express";
import { AddExtraSimpleSchema, type AddExtraRequest } from "./types.ts";
import mongoose from "mongoose";
import { Stay } from "../../../models/Stay.ts";

export async function addExtra(
  req: AddExtraRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = AddExtraSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const { extra, amount } = req.body;

    const updatedStay = await Stay.findByIdAndUpdate(
      req.params.id,
      {
        $push: { extras: { extra, amount } },
      },
      {
        new: true,
      },
    )
      .populate("guest")
      .populate("reservation")
      .populate("room")
      .populate("extras.extra")
      .lean();

    res.status(200).json(updatedStay);
  } catch (error) {
    console.error("Error in addExtra controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
