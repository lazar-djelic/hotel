import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../../lib/utils.ts";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import { Link } from "react-router";
import type { Dispatch, FC, SetStateAction } from "react";
import type { ReviewStruct } from "../interfaces/ReviewStruct.ts";

type ReviewCardArgs = {
  review: ReviewStruct;
  setReviews: Dispatch<SetStateAction<ReviewStruct[]>>;
};

const ReviewCard: FC<ReviewCardArgs> = ({ review, setReviews }) => {
  const handleDelete = async (e: any, id: number) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((review) => review._id !== id));
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete the review!");
    }
  };
  return (
    <div className="card  bg-base-100 hover:shadow-lg transition-all duration-200 border-t-8 border-b-2 border-solid">
      <div className="card-body">
        <h4 className="card-title text-base-content">{review.guest}</h4>
        <p className="text-base-content/70 line-clamp-3">{review.opinion}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(review.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <Link to={`/review/${review._id}`}>
              <button className="btn btn-ghost btn-s text-info">
                <PenSquareIcon className="size-4" />
              </button>
            </Link>
            <button
              className="btn btn-ghost btn-s text-error"
              onClick={(e) => handleDelete(e, review._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
