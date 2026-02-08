import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateReview } from "../api/reviews/create-review/useCreateReview";
import toast from "react-hot-toast";
import { reviewSimpleSchema } from "../../schemas/review.response.schema";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";

const CreateReviewPage = () => {
  const { t } = useTranslation();
  const [guest, setGuest] = useState("");
  const [opinion, setOpinion] = useState("");
  const navigate = useNavigate();

  const { mutate: createReview, isPending } = useCreateReview(navigate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = reviewSimpleSchema.safeParse({
      guest,
      opinion,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";

      toast.error(firstError);
      return;
    }

    createReview(parsed.data);
  };

  return (
    <>
      <Navbar />

      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to="/reviews" className="btn btn-ghost mb-6">
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
                        {t("create.review.name")}
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      placeholder={t("create.review.plhname")}
                      value={guest}
                      onChange={(e) => setGuest(e.target.value)}
                    />
                  </div>

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
