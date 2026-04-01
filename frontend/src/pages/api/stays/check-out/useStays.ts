import { useQuery } from "@tanstack/react-query";
import type { Stay } from "../../../../types/StayType";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { stayArraySchema } from "../../../../schemas/stay.response.schema";
import { fetchStays } from "../stays.api";

export const useStays = () => {
  const { data: stays = [], isLoading } = useQuery<Stay[]>({
    queryKey: [QUERY_KEYS.STAYS.STAYS],
    queryFn: async () => {
      const rawStays = await fetchStays();
      const parsed = stayArraySchema.safeParse(rawStays);
      if (!parsed.success) {
        console.error("Invalid stay data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    stays,
    loading: isLoading,
  };
};
