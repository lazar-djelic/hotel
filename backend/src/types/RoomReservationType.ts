import type { CurrType, ResStatus } from "../utils/enums.ts";
import type { Guest } from "./Guest.ts";
import type { Room } from "./RoomType.ts";

export type RoomReservation = {
  _id: string;
  guest: Guest;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: Room;
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
