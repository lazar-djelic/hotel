import api from "../../../lib/axios";
import type { RangeType } from "../../interfaces/RangeType";
import { formatDate } from "./formatDate";
import type { ReservationStruct } from "./ReservationStruct";

export const fetchReservations = async (
  dateRange: RangeType
): Promise<ReservationStruct[]> => {
  const sDate = formatDate(dateRange.startDate);
  const eDate = formatDate(dateRange.endDate);

  const res = await api.get("/reservations", {
    params: { startDate: sDate, endDate: eDate },
  });
  return res.data;
};
