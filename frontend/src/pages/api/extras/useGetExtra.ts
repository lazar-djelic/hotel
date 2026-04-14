import { useQuery } from "@tanstack/react-query";
import type { GetExtra } from "../../../types/StayType";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchExtra } from "./extras.api";
import { extraSchema } from "../../../schemas/extra.response.schema";

export const useGetExtra = (id: string) => {
  const { data: extra, isLoading } = useQuery<GetExtra>({
    queryKey: [QUERY_KEYS.EXTRAS.EXTRA, id],
    queryFn: async () => {
      const raw = await fetchExtra(id);
      const parsed = extraSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid extra data from API", parsed.error);
        throw new Error("Invalid extra data");
      }

      return parsed.data;
    },
    enabled: !!id,
  });

  return { extra, loading: isLoading };
};
