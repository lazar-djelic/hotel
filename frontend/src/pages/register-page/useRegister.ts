import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, type RegisterPayload } from "../../services/authService";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
