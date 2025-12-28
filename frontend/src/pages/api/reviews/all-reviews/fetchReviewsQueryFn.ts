import { reviewArraySchema } from "../../../../schemas/review.response.schema";
import { fetchReviews } from "../reviews.api";

export const fetchReviewsQueryFn = async () => {
  const rawReviews = await fetchReviews();
  const parsed = reviewArraySchema.safeParse(rawReviews);
  if (!parsed.success) {
    console.error("Invalid review data", parsed.error);
    return [];
  }
  return parsed.data;
};
