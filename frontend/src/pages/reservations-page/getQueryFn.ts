import api from "../../lib/axios";

export const getQueryFn = async () => {
  const res = await api.get("/reservations");
  return res.data;
};
