import type { Room } from "./RoomType.ts";
import type { ResStatus } from "../config/enums";

export type RoomReservation = {
  _id: string;
  guest: any;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: Room;
  resStatus: ResStatus;
  createdAt: Date;
  updatedAt: Date;
};
