import type { getRoom, Room } from "./RoomType.ts";
import type { ResStatus } from "../config/enums";

export type RoomReservation = {
  _id: string;
  guest: any;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: getRoom;
  resStatus: ResStatus;
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
  createdAt: Date;
  updatedAt: Date;
};
