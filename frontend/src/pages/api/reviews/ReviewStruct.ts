import type { GuestStruct } from "../../profile-page/GuestStruct";

export interface ReviewStruct {
  _id: string;
  guest: GuestStruct;
  opinion: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type SimpleReviewStruct = {
  opinion: string;
  rating: number;
};
