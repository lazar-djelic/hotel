import api from "../../../lib/axios";
import type { Extra, GetExtra } from "../../../types/StayType";

export const createExtra = async (extra: Extra): Promise<GetExtra> => {
  const res = await api.post("/extras", { ...extra });
  return res.data;
};

export const fetchExtras = async (): Promise<GetExtra[]> => {
  const res = await api.get("/extras");
  return res.data;
};

export const deleteExtra = async (id: string): Promise<void> => {
  await api.delete(`/extras/${id}`);
};

export const fetchExtra = async (id: string): Promise<GetExtra> => {
  const res = await api.get(`/extras/${id}`);
  return res.data;
};

export const updateExtra = async ({
  id,
  extra,
}: {
  id: string;
  extra: Extra;
}) => {
  await api.put(`/extras/${id}`, extra);
};
