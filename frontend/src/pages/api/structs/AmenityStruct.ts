import type { AmenityTypes } from "../../../config/enums";

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
};
