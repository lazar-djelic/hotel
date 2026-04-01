import api from "../../../lib/axios";
import type { Stay } from "../../../types/StayType";
import type { SimpleExtraStruct } from "../structs/ExtraStruct";
import type { stayCreateStruct } from "../structs/StayStruct";

export const createStay = async ({
  stay,
}: {
  stay: stayCreateStruct;
}): Promise<void> => {
  console.log(stay);
  await api.post(`/stays/`, stay);
};

export const fetchStays = async (): Promise<Stay[]> => {
  const res = await api.get("/stays");
  return res.data;
};

export const addExtra = async ({
  id,
  extra,
}: {
  id: string;
  extra: SimpleExtraStruct;
}): Promise<Stay> => {
  const res = await api.put(`/stays/addExtra/${id}`, { ...extra });
  return res.data;
};

export const checkOut = async ({
  id,
  notes,
}: {
  id: string;
  notes: string;
}): Promise<void> => {
  console.log(id, notes);
  const res = await api.post(`/stays/checkout/${id}`, { notes });
  return res.data;
};
