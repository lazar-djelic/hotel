import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenitySlotStruct } from "../../structs/AmenitySlot";
import { fetchAmenitySlotsQueryFn } from "./fetchAmenitySlots.QueryFn";

export const useAmenitySlots = (id: string, date: Date) => {
  const { data: slots = [], isLoading } = useQuery<AmenitySlotStruct[]>({
    queryKey: [QUERY_KEYS.SLOTS.SLOTS, id, date],
    queryFn: () => fetchAmenitySlotsQueryFn(id, date),
    enabled: !!id && !!date,
  });

  return {
    slots,
    loading: isLoading,
  };
};
