import api from "../../../lib/axios";
import type { MyAmenityReservationStruct } from "../structs/AmenityReservation";
import type { getMyReviewStruct } from "../structs/ReviewStruct";
import type { MyRoomReservationStruct } from "../structs/RoomReservationStruct";
import type { MyStayStruct } from "../structs/StayStruct";

export const fetchMyReview = async (): Promise<getMyReviewStruct> => {
  const res = await api.get("/profile/myreview");
  return res.data;
};

export const fetchMyAmRes = async (): Promise<MyAmenityReservationStruct[]> => {
  const res = await api.get("/profile/myamres");
  return res.data;
};

export const fetchMyRoomRes = async (): Promise<MyRoomReservationStruct[]> => {
  const res = await api.get("/profile/myroomres");
  return res.data;
};

export const fetchMyStays = async (): Promise<MyStayStruct[]> => {
  const res = await api.get("/profile/mystays");
  return res.data;
};
