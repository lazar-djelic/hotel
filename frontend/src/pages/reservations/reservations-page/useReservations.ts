import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchReservationsQueryFn } from "./fetchReservationsQueryFn";
import type { ReservationStruct } from "../../api/reservations/ReservationStruct";
import type { RangeType } from "../../interfaces/RangeType";
import type { SetURLSearchParams } from "react-router-dom";

export const useReservations = (
  dateRange: RangeType,
  option: string,
  setSearchParams: SetURLSearchParams,
) => {
  const { data: reservations = [], isLoading } = useQuery<ReservationStruct[]>({
    queryKey: [QUERY_KEYS.RESERVATION.RESERVATIONS, dateRange, option],
    queryFn: () => fetchReservationsQueryFn(dateRange, option, setSearchParams),
  });

  return {
    reservations,
    isLoading: isLoading,
  };
};
