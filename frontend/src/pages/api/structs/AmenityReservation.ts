import type { AmResStatus } from "../../../config/enums";
import type { AmenityStruct } from "./AmenityStruct";
import type { GuestStruct } from "./GuestStruct";
import type { UserStruct } from "./UserStruct";

export interface AmenityReservationStruct {
  _id: string;
  amenity: AmenityStruct;
  user?: UserStruct | null;
  guest: GuestStruct;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type SimpleAmenityReservationStruct = {
  amenity: string;
  user?: UserStruct | null;
  guest: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
};

export type SimpleAmenityCreateReservationReceptionStruct = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: Date;
  notes?: string;
  date: Date;
  amenity: string;
  user: string | null;
  guest: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
};
