import api from "../../../lib/axios";
import type { RangeType } from "../../interfaces/RangeType";
import { formatDate } from "./formatDate";
import type { RoomReservationStruct } from "../structs/RoomReservationStruct";

export const fetchReservations = async (
  dateRange: RangeType,
): Promise<RoomReservationStruct[]> => {
  const sDate = formatDate(dateRange.startDate);
  const eDate = formatDate(dateRange.endDate);

  const res = await api.get("/roomreservations", {
    params: { startDate: sDate, endDate: eDate },
  });
  return res.data;
};
