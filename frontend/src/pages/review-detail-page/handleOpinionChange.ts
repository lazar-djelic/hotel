import type { ReviewStruct } from "../interfaces/ReviewStruct";

export const handleOpinionChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  review: ReviewStruct,
  setReview: React.Dispatch<React.SetStateAction<ReviewStruct | null>>
) => {
  if (review) {
    setReview({ ...review, opinion: e.target.value });
  }
};
