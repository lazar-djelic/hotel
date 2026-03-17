import axios from "axios";
import { fetchConfig } from "./conf.api";
import { confSchema } from "./conf.schema";
import type { HotelConfig } from "./configStruct";

const defaultConfig: HotelConfig = {
  levels: 0,
  room: true,
  conference: false,
  spa: false,
  pool: false,
  restaurant: false,
  gym: false,
  sauna: false,
};

export const fetchConfQueryFn = async (): Promise<HotelConfig> => {
  try {
    const rawConfig = await fetchConfig();

    const parsed = confSchema.safeParse(rawConfig);
    if (!parsed.success) {
      console.error("Invalid conf data", parsed.error);
      return defaultConfig;
    }
    return parsed.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return defaultConfig;
    }

    throw err;
  }
};
