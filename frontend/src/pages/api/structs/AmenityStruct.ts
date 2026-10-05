import type { AmenityTypes, CurrType } from "../../../config/enums";

export interface AmenityStruct {
  _id: string;
  name: string;
  type: AmenityTypes;
  capacity: number;
  slotDuration: number;
  openTime: string;
  closeTime: string;
  requiresReservation: boolean;
  onePerSlot: boolean;
  price: number;
  currency: CurrType;
  createdAt: Date;
  updatedAt: Date;
}

export type SimpleAmenityStruct = {
  name: string;
  type: AmenityTypes;
  capacity: number;
  slotDuration: number;
  openTime: string;
  closeTime: string;
  requiresReservation: boolean;
  onePerSlot: boolean;
  price: number;
  currency: CurrType;
};
