import Navbar from "../../components/Navbar";
import type { ReviewStruct } from "../interfaces/ReviewStruct";
import ReviewCard from "./ReviewCard";
import { useReviews } from "./useReviews";

const ReviewsPage = () => {
  const { loading, reviews, setReviews } = useReviews();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading reviews...
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center text-primary py-10">
            There are no reviews yet.
          </div>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {reviews.map((review: ReviewStruct) => (
              <ReviewCard
                key={review._id}
                review={review}
                setReviews={setReviews}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
