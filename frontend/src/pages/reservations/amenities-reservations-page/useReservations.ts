import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchRoomReservationsQueryFn as fetchRoomReservationsQueryFn } from "./fetchReservationsQueryFn";
import type { RoomReservationStruct } from "../../api/structs/RoomReservationStruct";
import type { RangeType } from "../../interfaces/RangeType";
import type { SetURLSearchParams } from "react-router-dom";

export const useRoomReservations = (
  dateRange: RangeType,
  option: string,
  setSearchParams: SetURLSearchParams,
) => {
  const { data: reservations = [], isLoading } = useQuery<
    RoomReservationStruct[]
  >({
    queryKey: [QUERY_KEYS.RESERVATION.RESERVATIONS, dateRange, option],
    queryFn: () =>
      fetchRoomReservationsQueryFn(dateRange, option, setSearchParams),
  });

  return {
    reservations,
    isLoading: isLoading,
  };
};
