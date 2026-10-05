import api from "../../../lib/axios";
import type { ReviewStruct, SimpleReviewStruct } from "../structs/ReviewStruct";

export const fetchReviews = async (): Promise<ReviewStruct[]> => {
  const res = await api.get("/reviews");
  return res.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await api.delete(`/reviews/${id}`);
};

export const fetchReview = async (id: string): Promise<ReviewStruct> => {
  const res = await api.get(`/reviews/${id}`);
  return res.data;
};

export const updateReview = async ({
  id,
  review,
}: {
  id: string;
  review: SimpleReviewStruct;
}) => {
  await api.put(`/reviews/${id}`, review);
};
