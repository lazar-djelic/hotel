import type { Stay } from "./StayType.ts";
import type {
  RoomTypes,
  BedOptions,
  ViewOptions,
  RoomStatus,
  HousekeepingOptions,
  CurrType,
} from "../config/enums";

export type Room = {
  _id: string;
  floor: number;
  roomnum: number;
  type: RoomTypes;
  bednum: BedOptions;
  smoking: boolean;
  accessibility: boolean;
  view: ViewOptions;
  balcony: boolean;
  status: RoomStatus;
  housekeeping: HousekeepingOptions;
  lastcleaned: Date;
  linkedroom: boolean;
  pets: boolean;
  currentStay?: Stay | null | undefined;
  rate: number;
  currency: CurrType;
  createdAt: Date;
  updatedAt: Date;
};

export type getRoom = {
  _id: string;
  floor: number;
  roomnum: number;
  type: RoomTypes;
  bednum: BedOptions;
  smoking: boolean;
  accessibility: boolean;
  view: ViewOptions;
  balcony: boolean;
  status: RoomStatus;
  housekeeping: HousekeepingOptions;
  lastcleaned: Date;
  linkedroom: boolean;
  pets: boolean;
  currentStay?: string | null | undefined;
  rate: number;
  currency: CurrType;
  createdAt: Date;
  updatedAt: Date;
};
