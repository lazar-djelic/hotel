import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useReview } from "./useReview.ts";
import { handleDelete } from "./handleDelete.ts";
import { useSaveReview } from "./handleSave.ts";
import { handleGuestChange } from "./handleGuestChange.ts";
import { handleOpinionChange } from "./handleOpinionChange.ts";

const ReviewDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, review, setReview } = useReview(id!);
  const { saving, onSave } = useSaveReview();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/reviews"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back
            </Link>
            <button
              onClick={() => handleDelete(navigate, id!)}
              className="btn btn-error btn-outline"
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
                  type="text"
                  placeholder="Edit your name"
                  className="input input-bordered"
                  value={review?.guest}
                  onChange={(e) => handleGuestChange(e, review!, setReview)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your review</span>
                </label>
                <textarea
                  placeholder="Edit your review"
                  className="textarea textarea-bordered h-36"
                  value={review?.opinion}
                  onChange={(e) => handleOpinionChange(e, review!, setReview)}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={() => onSave(id!, review!, navigate)}
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
