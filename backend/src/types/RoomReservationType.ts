import type { ResStatus } from "../utils/enums.ts";
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
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
};
