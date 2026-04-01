import type {
  BedOptions,
  CurrType,
  HousekeepingOptions,
  RoomStatus,
  RoomTypes,
  ViewOptions,
} from "../utils/enums.ts";
import type { Stay } from "./StayType.ts";

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
