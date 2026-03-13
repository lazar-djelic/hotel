import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, type RegisterPayload } from "../../services/authService";
import type { NavigateFunction } from "react-router-dom";

export const useRegister = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/profile");
    },
  });
};
