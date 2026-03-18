import ReviewCard from "./ReviewCard";
import { useReviews } from "../../api/reviews/all-reviews/useReviews";
import { useTranslation } from "react-i18next";

const ReviewsPage = () => {
  const { t } = useTranslation();
  const { reviews, loading, removeReview } = useReviews();

  return (
    <div className="mt-8">
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="mb-16 text-5xl font-semibold">{t("review.title")}</div>

        {loading && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center text-primary py-10">
            {t("review.norev")}
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
