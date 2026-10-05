import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { AmenitySlotStruct } from "../../structs/AmenitySlot";
import { fetchAmenitySlots } from "../amenities.api";
import { slotsArraySchema } from "../../../../schemas/slots.response.schema";

export const useAmenitySlots = (id: string, date: Date) => {
  const { data: slots = [], isLoading } = useQuery<AmenitySlotStruct[]>({
    queryKey: [QUERY_KEYS.SLOTS.SLOTS, id, date],
    queryFn: async () => {
      if (id === "") return [];
      const rawSlots = await fetchAmenitySlots(id, date);
      const parsed = slotsArraySchema.safeParse(rawSlots.slots);
      if (!parsed.success) {
        console.error("Invalid slots data", parsed.error.issues);
        return [];
      }
      return parsed.data;
    },
    enabled: !!id && !!date,
  });

  return {
    slots,
    loading: isLoading,
  };
};
