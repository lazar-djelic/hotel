import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, type LoginPayload } from "../../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
