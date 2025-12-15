import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const ReviewDetailPage = () => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await api.get(`/reviews/${id}`);
                setReview(res.data);
            } catch (error) {
                console.log("Error in fetchReview", error);
                toast.error("Failed to fetch the review!");
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await api.delete(`reviews/${id}`);
            toast.success("Review deleted successfully!");
            navigate("/reviews");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete the review!");
        }
    };

    const handleSave = async () => {
        if (!review.guest.trim() || !review.opinion.trim()) {
            toast.error("Please enter all information!");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/reviews/${id}`, review);
            toast.success("Review updated successfully!");
            navigate("/reviews");
        } catch (error) {
            console.log("Error saving the review", error);
            toast.error("Failed to update the review");
        } finally {
            setSaving(false);
        }
    };

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
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
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
                                    value={review.guest}
                                    onChange={(e) => setReview({ ...review, guest: e.target.value })} />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Your review</span>
                                </label>
                                <textarea
                                    placeholder="Edit your review"
                                    className="textarea textarea-bordered h-36"
                                    value={review.opinion}
                                    onChange={(e) => setReview({ ...review, opinion: e.target.value })} />
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
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