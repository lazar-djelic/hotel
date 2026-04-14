import { useQuery } from "@tanstack/react-query";
import type { GetExtra } from "../../../types/StayType";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchExtras } from "./extras.api";
import { extraArraySchema } from "../../../schemas/extra.response.schema";

export const useGetExtras = () => {
  const { data: extras = [], isLoading } = useQuery<GetExtra[]>({
    queryKey: [QUERY_KEYS.EXTRAS.EXTRAS],
    queryFn: async () => {
      const rawExtras = await fetchExtras();
      const parsed = extraArraySchema.safeParse(rawExtras);
      if (!parsed.success) {
        console.error("Invalid extras data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    extras,
    loading: isLoading,
  };
};
