import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { createGuestMutationFn } from "./createMutationFn";
import type { Dispatch, SetStateAction } from "react";
import type { GuestStruct } from "../../../profile-page/GuestStruct";

export const useCreateGuest = (
  navigate: (path: string) => void,
  setForm: Dispatch<SetStateAction<GuestStruct | null>>,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createGuestMutationFn,
    onSuccess: () => {
      toast.success("Guest created successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GUEST.GUEST] });

      queryClient.invalidateQueries({ queryKey: ["me"] });
      setForm(null);
      navigate("/profile");
    },
    onError: () => {
      toast.error("Failed to create a guest!");
    },
  });

  return mutation;
};
