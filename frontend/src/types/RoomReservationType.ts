import type { getRoom } from "./RoomType.ts";
import type { CurrType, ResStatus } from "../config/enums";

export type RoomReservation = {
  _id: string;
  guest: any;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: getRoom;
  resStatus: ResStatus;
  rate: number;
  currency: CurrType;
  paid: boolean;
  paidDate?: Date | undefined;
  paymentIntentId?: string | undefined;
  checkoutSessionId?: string | undefined;
  refunded?: boolean | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type MyRoomReservation = {
  _id: string;
  guest: string;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom?: getRoom;
  resStatus: ResStatus;
  rate: number;
  currency: CurrType;
  paid: boolean;
  paidDate?: Date | undefined;
  paymentIntentId?: string | undefined;
  checkoutSessionId?: string | undefined;
  refunded?: boolean | undefined;
  createdAt: Date;
  updatedAt: Date;
};
