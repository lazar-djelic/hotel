import { useQuery } from "@tanstack/react-query";
import type { MyRoomReservationStruct } from "../structs/RoomReservationStruct";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchMyRoomRes } from "./profile.api";
import { getMyRoomReservationArraySchema } from "../../../schemas/roomReservation.response.schema";

export const useMyRoomRes = () => {
  const { data: roomres = [], isLoading } = useQuery<MyRoomReservationStruct[]>(
    {
      queryKey: [QUERY_KEYS.ROOM_RES.RESERVATIONS],
      queryFn: async () => {
        const rawRes = await fetchMyRoomRes();
        const parsed = getMyRoomReservationArraySchema.safeParse(rawRes);
        if (!parsed.success) {
          console.error("Invalid room reservation data", parsed.error);
          return [];
        }
        return parsed.data;
      },
    },
  );

  return {
    roomres,
    loadingRoom: isLoading,
  };
};
