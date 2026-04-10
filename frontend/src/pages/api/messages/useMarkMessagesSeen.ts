import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/axios";
import { QUERY_KEYS } from "../../../config/query-keys";

export const useMarkMessagesSeen = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (participantId: string) => {
      const res = await api.put("/messages/mark-seen", {
        participantId,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
        exact: true,
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
        exact: true,
      });
    },
  });

  return mutation;
};
