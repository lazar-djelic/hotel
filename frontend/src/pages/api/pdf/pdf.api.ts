import api from "../../../lib/axios";

export const makePdfStay = async (id: string): Promise<Blob> => {
  const res = await api.post("/pdf/stay", { id }, { responseType: "blob" });
  return res.data;
};

export const makePdfRoomres = async (id: string): Promise<Blob> => {
  const res = await api.post("/pdf/roomres", { id }, { responseType: "blob" });
  return res.data;
};

export const makePdfAmres = async (id: string): Promise<Blob> => {
  const res = await api.post("/pdf/amres", { id }, { responseType: "blob" });
  return res.data;
};
