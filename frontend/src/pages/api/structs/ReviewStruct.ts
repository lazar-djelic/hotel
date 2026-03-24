import type { GuestStruct } from "../structs/GuestStruct";

export interface ReviewStruct {
  _id: string;
  guest: GuestStruct; //promeni
  opinion: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type SimpleReviewStruct = {
  opinion: string;
  rating: number;
};
