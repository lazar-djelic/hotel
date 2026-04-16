import type {
  BedOptions,
  ResStatus,
  RoomTypes,
  ViewOptions,
} from "../../../config/enums";
import type { getRoomStruct } from "./RoomStruct";

export type SimpleStayCreateStruct = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: Date;
  notes?: string;
  guest: string | undefined;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: getRoomStruct | undefined | null;
  room: getRoomStruct | undefined | null;
  resStatus: ResStatus | undefined;
  paid: boolean;
  roomReservation: string | undefined;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  notesStay: string;
  roomType: RoomTypes;
  bedNum: BedOptions;
  smoking?: boolean | undefined;
  accessibility?: boolean | undefined;
  view?: ViewOptions | undefined;
  balcony?: boolean | undefined;
  pets?: boolean | undefined;
  breakfast: boolean;
  payNow: boolean;
};

export type stayCreateStruct = {
  guest: string;
  reservation?: string | null | undefined;
  room: string;
  checkIn: Date;
  checkOut: Date;
  adults?: number | undefined;
  children?: number | undefined;
  notes?: string | undefined;
  breakfast: boolean;
};

export type MyStayStruct = {
  _id: string;
  guest: string;
  reservation?: string | null | undefined;
  room: getRoomStruct;
  checkIn: Date;
  checkOut: Date;
  stStatus: string;
  adults: number;
  children: number;
  rate: number;
  currency: string;
  paid: boolean;
  paidDate?: Date | undefined;
  notes: string;
};
