import type { CurrType, StStatus } from "../utils/enums.ts";
import type { Guest } from "./Guest.ts";
import type { RoomReservation } from "./RoomReservationType.ts";
import type { Room } from "./RoomType.ts";

export type Extra = {
  nameEng: string;
  nameSrb: string;
  price: number;
};

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
    extra: Extra;
    amount: number;
  }[];
  paid: boolean;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};
