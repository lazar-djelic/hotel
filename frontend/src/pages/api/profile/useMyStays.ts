import { useQuery } from "@tanstack/react-query";
import type { MyStayStruct } from "../structs/StayStruct";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchMyStays } from "./profile.api";
import { getStayArraySchema } from "../../../schemas/stay.response.schema";

export const useMyStays = () => {
  const { data: stays = [], isLoading } = useQuery<MyStayStruct[]>({
    queryKey: [QUERY_KEYS.STAYS.STAYS],
    queryFn: async () => {
      const rawStays = await fetchMyStays();
      const parsed = getStayArraySchema.safeParse(rawStays);
      if (!parsed.success) {
        console.error("Invalid stays data", parsed.error);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    stays,
    loadingSt: isLoading,
  };
};
