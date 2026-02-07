import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../config/query-keys";
import { fetchReservationsQueryFn } from "./fetchReservationsQueryFn";
import type { ReservationStruct } from "../api/reservations/ReservationStruct";
import type { RangeType } from "../interfaces/RangeType";

export const useReservations = (dateRange: RangeType, option: string) => {
  const { data: reservations = [], isLoading } = useQuery<ReservationStruct[]>({
    queryKey: [QUERY_KEYS.RESERVATION.RESERVATIONS, dateRange, option],
    queryFn: () => fetchReservationsQueryFn(dateRange, option),
  });

  return {
    reservations,
    isLoading: isLoading,
  };
};
