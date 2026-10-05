import { useQuery } from "@tanstack/react-query";
import type { RoomReservationStruct } from "../../structs/RoomReservationStruct";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { roomReservationSchema } from "../../../../schemas/roomReservation.response.schema";
import { fetchRoomReservation } from "../roomReservations.api";

export const useRoomReservation = (id: string) => {
  const { data: roomReservation, isLoading } = useQuery<RoomReservationStruct>({
    queryKey: [QUERY_KEYS.ROOM_RES.RESERVATION, id],
    queryFn: async () => {
      const raw = await fetchRoomReservation(id);
      const parsed = roomReservationSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("Invalid room reservation data from API", parsed.error);
        throw new Error("Invalid room reservation data");
      }

      return parsed.data;
    },
    enabled: !!id,
  });

  return {
    roomReservation,
    loading: isLoading,
  };
};
