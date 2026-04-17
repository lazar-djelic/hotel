import type {
  BedOptions,
  CurrType,
  ResStatus,
  RoomTypes,
  ViewOptions,
} from "../../../config/enums";
import type { GuestStruct } from "./GuestStruct";
import type { getRoomStruct, RoomStruct } from "./RoomStruct";

export interface RoomReservationStruct {
  _id: string;
  guest: GuestStruct;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: RoomStruct;
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
}

export type SimpleRoomReservationStruct = {
  guest: string;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: string | null;
  resStatus: ResStatus;
};

export type SimpleRoomResCreateStruct = {
  guest: string;
  startDate: Date;
  endDate: Date;
  roomType: RoomTypes;
  bedNum: BedOptions;
  adults: number;
  children: number;
  assignedRoom: RoomStruct | undefined | null;
  smoking?: boolean | undefined;
  accessibility?: boolean | undefined;
  view?: ViewOptions | undefined;
  balcony?: boolean | undefined;
  pets?: boolean | undefined;
  payNow: boolean;
};

export type SimpleRoomResCreateReceptionStruct = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: Date;
  notes?: string;
  guest: string;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom: RoomStruct | undefined | null;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  roomType: RoomTypes;
  bedNum: BedOptions;
  smoking?: boolean | undefined;
  accessibility?: boolean | undefined;
  view?: ViewOptions | undefined;
  balcony?: boolean | undefined;
  pets?: boolean | undefined;
  payNow: boolean;
};

export interface MyRoomReservationStruct {
  _id: string;
  guest: string;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  assignedRoom?: getRoomStruct | undefined;
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
}
