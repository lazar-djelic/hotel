import { useQuery } from "@tanstack/react-query";
import type { Stay } from "../../../types/StayType";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchStay } from "./stays.api";
import { staySchema } from "../../../schemas/stay.response.schema";

export const useStay = (id: string) => {
  const { data: stay, isLoading } = useQuery<Stay>({
    queryKey: [QUERY_KEYS.STAYS.STAY, id],
    queryFn: async () => {
      const raw = await fetchStay(id);
      const parsed = staySchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid stay data from API", parsed.error);
        throw new Error("Invalid stay data");
      }

      return parsed.data;
    },
    enabled: !!id,
  });

  return {
    stay,
    loading: isLoading,
  };
};
