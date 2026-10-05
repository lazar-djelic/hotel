import api from "../../../lib/axios";
import type { AmenitySlotArrayStruct } from "../structs/AmenitySlot";
import type {
  AmenityStruct,
  SimpleAmenityStruct,
} from "../structs/AmenityStruct";

export const fetchAmenities = async (): Promise<AmenityStruct[]> => {
  const res = await api.get("/amenities");
  return res.data;
};

export const fetchAmenitySlots = async (
  id: string,
  date: Date,
): Promise<AmenitySlotArrayStruct> => {
  const dateOnly = date.toISOString().split("T")[0];

  const res = await api.get(`/amenities/${id}/slots`, {
    params: {
      date: dateOnly,
    },
  });
  return res.data;
};

export const deleteAmenity = async (id: string): Promise<void> => {
  await api.delete(`/amenities/${id}`);
};

export const fetchAmenity = async (id: string): Promise<AmenityStruct> => {
  const res = await api.get(`/amenities/${id}`);
  return res.data;
};

export const createAmenity = async (
  amenity: SimpleAmenityStruct,
): Promise<AmenityStruct> => {
  console.log(amenity);
  const res = await api.post("/amenities", amenity);
  return res.data;
};

export const updateAmenity = async ({
  id,
  amenity,
}: {
  id: string;
  amenity: SimpleAmenityStruct;
}): Promise<void> => {
  console.log(id, amenity);
  const res = await api.put(`/amenities/${id}`, amenity);
  return res.data;
};
