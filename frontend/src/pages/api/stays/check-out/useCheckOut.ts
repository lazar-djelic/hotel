import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOut } from "../stays.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import toast from "react-hot-toast";

export const useCheckOut = (
  navigate: (path: string) => void,
  id?: string,
  notes?: string,
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => checkOut({ id: id || "", notes: notes || "" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAYS.STAYS] });

      toast.success("Guest checked out successfully!");
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to check out guest");
    },
  });

  return {
    checkOut: mutate,
    // loadingCheckOut: isPending,
  };
};
