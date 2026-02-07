import { fetchConfig } from "./conf.api";
import { confSchema } from "./conf.schema";
import type { HotelConfig } from "./configStruct";

export const fetchConfQueryFn = async () => {
  const rawConfig = await fetchConfig();
  const parsed = confSchema.safeParse(rawConfig);
  if (!parsed.success) {
    console.error("Invalid conf data", parsed.error);
    const t: HotelConfig = {
      _id: "",
      levels: 0,
      room: true,
      conference: false,
      spa: false,
      pool: false,
      restaurant: false,
      gym: false,
    };
    return t;
  }
  return parsed.data;
};
