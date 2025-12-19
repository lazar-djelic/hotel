import toast from "react-hot-toast";
import api from "../../lib/axios";
import { type NavigateFunction } from "react-router-dom";

export const handleDelete = async (navigate: NavigateFunction, id: string) => {
  if (!window.confirm("Are you sure you want to delete this review?")) return;

  try {
    if (id) {
      await api.delete(`/reviews/${id}`);
      toast.success("Review deleted successfully!");
      navigate("/reviews");
    }
  } catch (error) {
    console.log("Error in handleDelete", error);
    toast.error("Failed to delete the review!");
  }
};
