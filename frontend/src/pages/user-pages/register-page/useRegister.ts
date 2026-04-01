import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  type RegisterPayload,
} from "../../../services/authService";
import type { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

export const useRegister = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate(ROUTES.GUEST.PROFILE);
    },
  });
};
