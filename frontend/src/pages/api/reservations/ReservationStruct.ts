import type { GuestStruct } from "../../profile-page/GuestStruct";

export interface ReservationStruct {
  _id: string;
  guest: GuestStruct;
  startDate: Date;
  endDate: Date;
  roomType: string;
  bedNum: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SimpleReservationStruct = {
  guest: GuestStruct;
  startDate: Date;
  endDate: Date;
  roomType: string;
  bedNum: string;
};
