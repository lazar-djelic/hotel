import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../../../lib/utils";
import { Link } from "react-router";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";
import type { ReviewStruct } from "../../api/structs/ReviewStruct";
import { ROUTES } from "../../../config/routes";

type ReviewCardArgs = {
  review: ReviewStruct;
  onDelete: (id: string) => void;
};

const ReviewCard: FC<ReviewCardArgs> = ({ review, onDelete }) => {
  const { i18n } = useTranslation();
  const [rating] = useState(review.rating);
  const { isAuthenticated, user } = useAuth();

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    onDelete(id);
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h4 className="card-title text-base-content text-3xl">
            {review.guest.fName + " " + review.guest.lName[0] + "."}
          </h4>
          <div className="rating pointer-events-none">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                type="radio"
                name={`${review._id}`}
                value={value}
                className="mask mask-star-2 bg-orange-400"
                checked={rating === value}
                readOnly
              />
            ))}
          </div>
        </div>

        <span className="text-sm text-base-content/60">
          {formatDate(review.createdAt, i18n.language)}
        </span>

        <p className="text-base-content/70 mt-4">{review.opinion}</p>

        {isAuthenticated &&
          (user?.guest?._id === review.guest._id || user?.role === "admin") && (
            <div className="card-actions justify-end items-center mt-4">
              <div className="flex items-center gap-1">
                {user?.role !== "admin" && (
                  <Link to={`${ROUTES.GUEST.REVIEW}/${review._id}`}>
                    <button className="btn btn-ghost btn-s text-info">
                      <PenSquareIcon className="size-4" />
                    </button>
                  </Link>
                )}

                <button
                  className="btn btn-ghost btn-s text-error"
                  onClick={() => handleDelete(review._id)}
                >
                  <Trash2Icon className="size-4" />
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ReviewCard;
