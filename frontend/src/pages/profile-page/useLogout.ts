import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.invalidateQueries({ queryKey: ["me"], refetchType: "all" });
    },
  });
};
