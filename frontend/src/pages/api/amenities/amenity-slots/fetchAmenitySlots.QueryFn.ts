import { slotsArraySchema } from "../../../../schemas/slots.response.schema";
import { fetchAmenitySlots } from "../amenities.api";

export const fetchAmenitySlotsQueryFn = async (id: string, date: Date) => {
  if (id === "") return [];
  const rawSlots = await fetchAmenitySlots(id, date);
  const parsed = slotsArraySchema.safeParse(rawSlots.slots);
  if (!parsed.success) {
    console.error("Invalid slots data", parsed.error.issues);
    return [];
  }
  return parsed.data;
};
