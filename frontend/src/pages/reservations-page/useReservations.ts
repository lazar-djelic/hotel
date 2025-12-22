import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";
import type { ReservationType } from "../interfaces/ReservationType";

export const useReservations = () => {
  return useQuery<ReservationType[], Error>({
    queryKey: ["reservations"],
    queryFn: async () => {
      const res = await api.get("/reservations");
      return res.data;
    },
  });
};
