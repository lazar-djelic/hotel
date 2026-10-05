import type { CurrType, StStatus } from "../config/enums.ts";
import type { Guest } from "./Guest.ts";
import type { RoomReservation } from "./RoomReservationType.ts";
import type { getRoom, Room } from "./RoomType.ts";

export type GetExtra = {
  _id: string;
  nameEng: string;
  nameSrb: string;
  price: number;
};

export type Extra = {
  nameEng: string;
  nameSrb: string;
  price: number;
};

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
    extra: GetExtra;
    amount: number;
  }[];
  paid: boolean;
  paidDate?: Date | undefined;
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
    extra: GetExtra;
    amount: number;
  }[];
  paid: boolean;
  paidDate?: Date | undefined;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};
