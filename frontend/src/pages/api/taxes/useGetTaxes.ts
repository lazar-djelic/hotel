import { useQuery } from "@tanstack/react-query";
import type { TaxesStruct } from "../structs/TaxesStruct";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchTaxes } from "./taxes.api";
import { taxesSchema } from "../../../schemas/taxes.schema";
import { isAxiosError } from "axios";

export const useGetTaxes = () => {
  const {
    data: taxes,
    isLoading,
    isError,
  } = useQuery<TaxesStruct>({
    queryKey: [QUERY_KEYS.TAXES.TAXES],
    queryFn: async () => {
      const raw = await fetchTaxes();
      const parsed = taxesSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid taxes data from API", parsed.error);
        throw new Error("Invalid taxes data");
      }

      return parsed.data;
    },
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  return { taxes, loading: isLoading, isError };
};
