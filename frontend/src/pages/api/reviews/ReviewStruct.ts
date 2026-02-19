export interface ReviewStruct {
  _id: string;
  guest: string;
  opinion: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type SimpleReviewStruct = {
  guest: string;
  opinion: string;
  rating: number;
};
