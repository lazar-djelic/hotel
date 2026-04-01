import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeRoles } from "../users.api";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { NavigateFunction } from "react-router";
import toast from "react-hot-toast";

export const useChangeRoles = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: changeRoles,
    onSuccess: (_, { id, role }) => {
      queryClient.setQueryData([QUERY_KEYS.USERS.USER, id], (old: any) => {
        if (!old) return old;
        return { ...old, role };
      });

      queryClient.setQueryData([QUERY_KEYS.USERS.USERS], (old: any) => {
        if (!old) return old;
        return old.map((user: any) =>
          user._id === id ? { ...user, role } : user,
        );
      });

      toast.success("User updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update the user");
    },
  });

  return {
    mutate,
    isPending,
  };
};
