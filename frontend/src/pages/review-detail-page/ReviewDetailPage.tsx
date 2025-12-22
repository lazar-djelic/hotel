import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useReview } from "./useReview";
import { useUpdateReview } from "./useUpdateReview";
import { useDeleteReview } from "./useDeleteReview";
import type { ReviewStruct } from "../interfaces/ReviewStruct";
import { reviewSimpleSchema } from "../../schemas/review.response.schema";

const ReviewDetailPage = () => {
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
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/reviews" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back
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
              Delete review
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
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
                  <span className="label-text">Your review</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-36"
                  value={current.opinion}
                  onChange={(e) =>
                    setForm({ ...current, opinion: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
