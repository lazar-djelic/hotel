import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import type { RoomReservationStruct } from "../../structs/RoomReservationStruct";
import type { RangeType } from "../../../interfaces/RangeType";
import type { SetURLSearchParams } from "react-router-dom";
import { fetchRoomReservations } from "../roomReservations.api";
import { roomReservationArraySchema } from "../../../../schemas/roomReservation.response.schema";

export const useRoomReservations = (
  dateRange: RangeType,
  setSearchParams: SetURLSearchParams,
) => {
  const { data: reservations = [], isLoading } = useQuery<
    RoomReservationStruct[]
  >({
    queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS, dateRange],
    queryFn: async () => {
      if (dateRange.startDate && dateRange.endDate) {
        setSearchParams({
          startDate: dateRange.startDate.toISOString(),
          endDate: dateRange.endDate.toISOString(),
        });
      }

      const rawReservations = await fetchRoomReservations(dateRange);
      const parsed = roomReservationArraySchema.safeParse(rawReservations);
      if (!parsed.success) {
        console.error("Invalid reservation data", parsed.error.issues);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    reservations,
    isLoading: isLoading,
  };
};
