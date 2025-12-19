import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import type { NavigateFunction } from "react-router";
import type { ReviewStruct } from "../interfaces/ReviewStruct";

export const useSaveReview = () => {
  const [saving, setSaving] = useState<boolean>(false);

  const onSave = async (
    id: string,
    review: ReviewStruct,
    navigate: NavigateFunction
  ) => {
    if (!review?.guest.trim() || !review?.opinion.trim()) {
      toast.error("Please enter all information!");
      return;
    }

    setSaving(true);

    try {
      if (id) {
        await api.put(`/reviews/${id}`, review);
        toast.success("Review updated successfully!");
        navigate("/reviews");
      }
    } catch (error) {
      console.log("Error saving the review", error);
      toast.error("Failed to update the review");
    } finally {
      setSaving(false);
    }
  };

  return { saving, onSave };
};
