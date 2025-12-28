import { reviewSchema } from "../../../../schemas/review.response.schema";
import { fetchReview } from "../reviews.api";

export const fetchReviewQueryFn = async (id: string) => {
  const raw = await fetchReview(id);
  const parsed = reviewSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Invalid review data from API", parsed.error);
    throw new Error("Invalid review data");
  }

  return parsed.data;
};
