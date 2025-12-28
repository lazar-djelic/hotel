export interface ReviewStruct {
  _id: string;
  guest: string;
  opinion: string;
  createdAt: string;
  updatedAt: string;
}

export type SimpleReviewStruct = {
  guest: string;
  opinion: string;
};
