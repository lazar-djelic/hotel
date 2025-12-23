import { reviewArraySchema } from "../../schemas/review.response.schema";
import { fetchReviews } from "../api/reviews.api";

export const fetchReviewsQueryFn = async () => {
  const rawReviews = await fetchReviews();
  const parsed = reviewArraySchema.safeParse(rawReviews);
  console.log(parsed);
  if (!parsed.success) {
    console.error("Invalid review data", parsed.error);
    return [];
  }
  return parsed.data;
};
