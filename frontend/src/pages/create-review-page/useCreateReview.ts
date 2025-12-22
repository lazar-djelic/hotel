import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import { reviewSimpleSchema } from "../../schemas/review.response.schema";
import type { reviewSimpleSchemaType } from "../../schemas/review.response.schema";

export const useCreateReview = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: reviewSimpleSchemaType) => {
      const payload = reviewSimpleSchema.parse(data);

      const res = await api.post("/reviews", payload);

      const parsedResponse = reviewSimpleSchema.safeParse(res.data);

      if (!parsedResponse.success) {
        console.error(
          "Invalid create review API response",
          parsedResponse.error
        );
        throw new Error("Invalid server response");
      }

      return parsedResponse.data;
    },
    onSuccess: () => {
      toast.success("Review created successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      navigate("/reviews");
    },
    onError: () => {
      toast.error("Failed to create a review!");
    },
  });

  return mutation;
};
