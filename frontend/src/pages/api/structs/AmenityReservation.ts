import type { AmResStatus, CurrType } from "../../../config/enums";
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

export type SimpleAmenityReservationStruct = {
  amenity: string;
  user?: string | null;
  guest: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
};

export type SimpleAmResCreateReceptionStruct = {
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
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  payNow: boolean;
};

export type SimpleAmResCreateStruct = {
  date: Date;
  amenity: string;
  user: string | null;
  guest: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
  payNow: boolean;
};

export interface MyAmenityReservationStruct {
  _id: string;
  amenity: AmenityStruct;
  user: string;
  guest?: string;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
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
