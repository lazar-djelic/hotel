import { amenityArraySchema } from "../../../../schemas/amenity.response.schema";
import { fetchAmenities } from "../amenities.api";

export const fetchAmenitiesQueryFn = async () => {
  const rawAmenities = await fetchAmenities();
  const parsed = amenityArraySchema.safeParse(rawAmenities);
  if (!parsed.success) {
    console.error("Invalid amenities data", parsed.error.issues);
    return [];
  }
  return parsed.data;
};
