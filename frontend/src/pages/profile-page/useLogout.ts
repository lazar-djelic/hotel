import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
