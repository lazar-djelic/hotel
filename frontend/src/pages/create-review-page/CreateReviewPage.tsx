import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { handleSubmit } from "./handleSubmit.ts";

const CreateReviewPage = () => {
  const [guest, setGuest] = useState("");
  const [opinion, setOpinion] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/reviews"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create new review</h2>
              <form
                onSubmit={(e) =>
                  handleSubmit(e, guest, opinion, navigate, setLoading)
                }
              >
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Enter your name"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Your review</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered textarea-md h-36"
                    placeholder="Write a review"
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create a review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReviewPage;
