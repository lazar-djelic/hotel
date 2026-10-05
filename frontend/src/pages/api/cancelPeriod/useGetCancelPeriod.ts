import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../config/query-keys";
import { isAxiosError } from "axios";
import type { CancelPeriodStruct } from "../structs/CancelPeriodStruct";
import { fetchCancelPeriod } from "./cancelPeriod.api";
import { cancelPeriodSchema } from "../../../schemas/cancelPeriod.response.schema";

export const useGetCancelPeriod = () => {
  const {
    data: cancelPeriod,
    isLoading,
    isError,
  } = useQuery<CancelPeriodStruct>({
    queryKey: [QUERY_KEYS.CANCEL.PERIOD],
    queryFn: async () => {
      const raw = await fetchCancelPeriod();
      const parsed = cancelPeriodSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid cancel period data from API", parsed.error);
        throw new Error("Invalid cancel period data");
      }

      return parsed.data;
    },
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  return { cancelPeriod, loading: isLoading, isError };
};
