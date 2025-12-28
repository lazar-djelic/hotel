import { type Response, type NextFunction } from "express";
import type { CreateReservationRequest } from "./types.ts";
import Reservation from "../../../models/Reservation.ts";
import { reservationSimpleSchema } from "../../../schemas/reservation.response.schema.ts";

export async function createReservation(
  req: CreateReservationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("hello");
    const { fName, lName, startDate, endDate, room } = req.body;
    const reservation = new Reservation({
      fName,
      lName,
      startDate,
      endDate,
      room,
    });
    const parsed = reservationSimpleSchema.parse(reservation);
    console.log(reservation);
    console.log(parsed);
    await reservation.save();
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
