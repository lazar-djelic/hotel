import ReviewCard from "./ReviewCard";
import { useReviews } from "../api/reviews/all-reviews/useReviews";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReviewsPage = () => {
  const { t } = useTranslation();
  const { reviews, loading, removeReview } = useReviews();

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-6" style={{ display: "flex" }}>
        <div style={{ marginLeft: "auto" }}>
          <Link to="/createreview" className="btn btn-outline mb-6 text-lg">
            <PlusIcon className="size-8" />
            {t("review.new")}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 mt-6">
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
