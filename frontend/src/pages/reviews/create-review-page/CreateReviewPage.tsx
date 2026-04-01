import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateReview } from "../../api/reviews/create-review/useCreateReview";
import toast from "react-hot-toast";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";
import { ROUTES } from "../../../config/routes";

const CreateReviewPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  const { mutate: createReview, isPending } = useCreateReview(navigate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = reviewSimpleSchema.safeParse({
      opinion,
      rating,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";

      toast.error(firstError);
      return;
    }

    createReview(parsed.data);
  };

  useEffect(() => {
    if (user && !user.guest) {
      toast.error("You need to enter your information first.");
      navigate(ROUTES.GUEST.PROFILE);
    }
  }, [user, navigate]);

  return (
    <>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={ROUTES.ALL.REVIEWS} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              {t("back")}
            </Link>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  {t("create.review.title")}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.review.review")}
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-36"
                      placeholder={t("create.review.plhreview")}
                      value={opinion}
                      onChange={(e) => setOpinion(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">{t("review.rating")}</span>
                    </label>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <input
                          key={value}
                          type="radio"
                          name={"rating"}
                          value={value}
                          className="mask mask-star-2 bg-orange-400"
                          checked={rating === value}
                          onChange={() => setRating(value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isPending}
                    >
                      {isPending
                        ? t("create.review.loadbtn")
                        : t("create.review.button")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReviewPage;
