import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import type { ReviewStruct } from "../interfaces/ReviewStruct";

export const useReview = (id: string) => {
  const [review, setReview] = useState<ReviewStruct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (id) {
          const res = await api.get(`/reviews/${id}`);
          setReview(res.data);
        }
      } catch (error) {
        console.log("Error in fetchReview", error);
        toast.error("Failed to fetch the review!");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  return { loading, review, setReview };
};
