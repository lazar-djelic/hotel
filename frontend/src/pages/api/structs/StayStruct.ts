import type {
  BedOptions,
  ResStatus,
  RoomTypes,
  ViewOptions,
} from "../../../config/enums";
import type { RoomStruct } from "./RoomStruct";

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
  assignedRoom: RoomStruct | undefined | null;
  room: RoomStruct | undefined | null;
  resStatus: ResStatus | undefined;
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
};

export type stayCreateStruct = {
  guest: string;
  reservation?: string | null | undefined;
  room: string;
  checkIn: Date;
  checkOut?: Date | null | undefined;
  adults?: number | undefined;
  children?: number | undefined;
  notes?: string | undefined;
};
