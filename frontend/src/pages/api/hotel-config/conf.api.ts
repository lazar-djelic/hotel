import api from "../../../lib/axios";
import type { HotelConfig } from "./configStruct";

export const fetchConfig = async (): Promise<HotelConfig> => {
  const res = await api.get("/config");
  return res.data;
};
