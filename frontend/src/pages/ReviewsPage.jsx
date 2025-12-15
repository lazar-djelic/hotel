import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import ReviewCard from "../components/ReviewCard";
import api from "../lib/axios";

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get("/reviews");
                console.log(res.data);
                setReviews(res.data);
            } catch (error) {
                console.log("Error fetching reviews");
                toast.error("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading reviews...</div>}

                {reviews.length === 0 && <div className="text-center text-primary py-10">There are no reviews yet.</div>}

                {reviews.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {reviews.map(review => (
                            <ReviewCard key={review._id} review={review} setReviews={setReviews} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;