import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../config/query-keys";
import api from "../../../lib/axios";

export interface IMessage {
  _id: string;
  sender: any;
  receiver?: any;
  content: string;
  seen: boolean;
  assignedReceptionist?: any;
  createdAt: Date;
}

export const useMyMessages = (enabled: boolean = true) => {
  const {
    data: messages = [],
    isLoading,
    refetch,
  } = useQuery<IMessage[]>({
    queryKey: [QUERY_KEYS.MESSAGES.MESSAGES],
    queryFn: async () => {
      const res = await api.get("/messages");
      return res.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
    enabled,
  });

  return {
    messages,
    loading: isLoading,
    refetch,
  };
};
