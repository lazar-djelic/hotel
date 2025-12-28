import { fetchConfig } from "./proba.api";
import { confSchema } from "./proba.conf.schema";
import type { HotelConfig } from "./struct";

export const fetchConfQueryFn = async () => {
  const rawConfig = await fetchConfig();
  const parsed = confSchema.safeParse(rawConfig);
  if (!parsed.success) {
    console.error("Invalid conf data", parsed.error);
    const t: HotelConfig = { _id: "", levels: 0 };
    return t;
  }
  return parsed.data;
};
