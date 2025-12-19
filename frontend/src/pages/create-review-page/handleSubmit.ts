import toast from "react-hot-toast";
import api from "../../lib/axios";
import type { NavigateFunction } from "react-router";

export const handleSubmit = async (
  e: any,
  guest: string,
  opinion: string,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  if (!guest.trim() || !opinion.trim()) {
    toast.error("All fields are required!");
    return;
  }

  setLoading(true);
  try {
    await api.post("/reviews", {
      guest,
      opinion,
    });
    toast.success("Review created successfully!");
    navigate("/reviews");
  } catch (error) {
    console.log("Error creating note", error);
    toast.error("Failed to create a review!");
  } finally {
    setLoading(false);
  }
};
