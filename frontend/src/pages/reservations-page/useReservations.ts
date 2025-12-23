import { useQuery } from "@tanstack/react-query";
import type { ReservationType } from "../interfaces/ReservationType";
import { QUERY_KEYS } from "../../config/query-keys";
import { getQueryFn } from "./getQueryFn";

export const useReservations = () => {
  return useQuery<ReservationType[], Error>({
    queryKey: [QUERY_KEYS.RESERVATION.RESERVATIONS],
    queryFn: () => getQueryFn(),
  });
};
