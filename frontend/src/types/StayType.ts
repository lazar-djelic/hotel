import type { CurrType, StStatus } from "../config/enums.ts";
import type { Guest } from "./Guest.ts";
import type { RoomReservation } from "./RoomReservationType.ts";
import type { Room } from "./RoomType.ts";

export type Stay = {
  _id: string;
  guest: Guest;
  reservation?: RoomReservation | null;
  room: Room;
  checkIn: Date;
  checkOut?: Date | null;
  stStatus: StStatus;
  adults?: number;
  children?: number;
  rate?: number;
  currency?: CurrType;
  extras?: {
    type: string;
    amount: number;
  }[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};
