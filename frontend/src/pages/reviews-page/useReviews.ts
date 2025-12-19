import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import type { ReviewStruct } from "../interfaces/ReviewStruct";

export const useReviews = () => {
  const [reviews, setReviews] = useState<ReviewStruct[]>([]);
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

  return { loading, reviews, setReviews };
};
