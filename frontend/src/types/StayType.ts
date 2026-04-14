import type { CurrType, StStatus } from "../config/enums.ts";
import type { Guest } from "./Guest.ts";
import type { RoomReservation } from "./RoomReservationType.ts";
import type { getRoom, Room } from "./RoomType.ts";

export type Stay = {
  _id: string;
  guest: Guest;
  reservation?: RoomReservation | null;
  room: getRoom;
  checkIn: Date;
  checkOut: Date;
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

export type getStay = {
  _id: string;
  guest: string;
  reservation?: string | null;
  room: getRoom;
  checkIn: Date;
  checkOut: Date;
  stStatus: StStatus;
  adults: number;
  children: number;
  rate: number;
  currency: CurrType;
  extras?: {
    type: string;
    amount: number;
  }[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};
