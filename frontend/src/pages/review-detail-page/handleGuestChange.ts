import type { ReviewStruct } from "../interfaces/ReviewStruct";

export const handleGuestChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  review: ReviewStruct,
  setReview: React.Dispatch<React.SetStateAction<ReviewStruct | null>>
) => {
  if (review) {
    setReview({ ...review, guest: e.target.value });
  }
};
