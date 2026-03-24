import type { ResStatus } from "../../../config/enums";
import type { GuestStruct } from "./GuestStruct";
import type { RoomStruct } from "./RoomStruct";

export interface RoomReservationStruct {
  _id: string;
  guest: GuestStruct;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: RoomStruct;
  resStatus: ResStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type SimpleRoomReservationStruct = {
  guest: GuestStruct;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: RoomStruct;
  resStatus: ResStatus;
};
