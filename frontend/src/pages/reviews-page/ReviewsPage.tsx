import Navbar from "../../components/Navbar";
import ReviewCard from "./ReviewCard";
import { useReviews } from "../api/reviews/all-reviews/useReviews";

const ReviewsPage = () => {
  const { reviews, loading, removeReview } = useReviews();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading reviews...
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center text-primary py-10">
            There are no reviews yet.
          </div>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onDelete={removeReview}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
