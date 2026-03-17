import { type Response, type NextFunction } from "express";
import type { CreateRoomReservationReceptionRequest } from "./types.ts";
import Guest from "../../../../models/Guest.ts";
import { guestSimpleSchema } from "../../../../schemas/guest.response.schema.ts";
import {
  roomReservationReceptionSimpleSchema,
  roomReservationSimpleSchema,
} from "../../../../schemas/roomReservation.response.schema.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";

export async function createRoomReservationReception(
  req: CreateRoomReservationReceptionRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      fName,
      lName,
      phone,
      email,
      address,
      personalID,
      birthDate,
      notes,
      startDate,
      endDate,
      roomType,
      bedNum,
    } = req.body;

    const validatedGuest = roomReservationReceptionSimpleSchema.parse(req.body);

    const guest = new Guest({
      fName,
      lName,
      phone,
      email,
      address,
      personalID,
      birthDate,
      notes,
    });
    const newGuest = await guest.save();

    console.log("----: ", newGuest._id);

    const reservation = new RoomReservation({
      guest: newGuest._id,
      startDate,
      endDate,
      roomType,
      bedNum,
    });
    const newReservation = await reservation.save();

    res.status(200).json(newReservation);
  } catch (error) {
    console.error("Error in createRoomReservationReception controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
