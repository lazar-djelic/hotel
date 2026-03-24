import { amenityReservationSchema } from "../../../../schemas/amenityReservation.response.schema";
import { fetchAmenityReservation } from "../amenityReservations.api";

export const fetchAmenityReservationQueryFn = async (id: string) => {
  const raw = await fetchAmenityReservation(id);
  const parsed = amenityReservationSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Invalid amenity reservation data from API", parsed.error);
    throw new Error("Invalid amenity reservation data");
  }

  return parsed.data;
};
