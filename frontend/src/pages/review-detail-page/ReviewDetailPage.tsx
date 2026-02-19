import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useReview } from "../api/reviews/review-detail/useReview";
import type { ReviewStruct } from "../api/reviews/ReviewStruct";
import { reviewSimpleSchema } from "../../schemas/review.response.schema";
import { useUpdateReview } from "../api/reviews/review-detail/useUpdateReview";
import { useDeleteReview } from "../api/reviews/review-detail/useDeleteReview";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";

const ReviewDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { review, loading } = useReview(id!);
  const { saving, saveReview } = useUpdateReview(navigate);
  const { deleteReview } = useDeleteReview(navigate);
  const [form, setForm] = useState<ReviewStruct | null>(null);

  const handleSave = () => {
    if (!form) return;
    console.log(form.guest, "  ", form.opinion);
    const parsed = reviewSimpleSchema.safeParse({
      guest: form.guest,
      opinion: form.opinion,
      rating: form.rating,
    });

    if (parsed.success) {
      saveReview({ id: id!, review: parsed.data });
    }
  };

  if (loading || !review) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const current = form ?? review;

  return (
    <>
      <Navbar />

      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/reviews" className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>

              <button
                className="btn btn-error btn-outline"
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    deleteReview(id!);
                  }
                }}
              >
                <Trash2Icon className="size-5" />
                {t("review.delrev")}
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">{t("review.name")}</span>
                  </label>
                  <input
                    className="input input-bordered"
                    value={current.guest}
                    onChange={(e) =>
                      setForm({ ...current, guest: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">{t("review.review")}</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-36"
                    value={current.opinion}
                    onChange={(e) =>
                      setForm({ ...current, opinion: e.target.value })
                    }
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
                        name={`${review._id}`}
                        value={value}
                        className="mask mask-star-2 bg-orange-400"
                        checked={current.rating === value}
                        onChange={() => setForm({ ...current, rating: value })}
                      />
                    ))}
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? t("review.loadsavebtn") : t("review.savebtn")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewDetailPage;
