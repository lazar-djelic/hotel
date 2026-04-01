import { BED_OPTIONS, ROOM_TYPES } from "../../../../config/enums";
import type { SimpleStayCreateStruct } from "../../structs/StayStruct";

export const createEmptyStay = (): SimpleStayCreateStruct => {
  const now = new Date();
  return {
    fName: "",
    lName: "",
    phone: "",
    email: "",
    address: "",
    personalID: "",
    birthDate: now,
    notes: "",
    guest: undefined,
    startDate: now,
    endDate: now,
    adults: 1,
    children: 0,
    assignedRoom: undefined,
    room: undefined,
    resStatus: undefined,
    roomReservation: undefined,
    _id: "",
    createdAt: now,
    updatedAt: now,
    notesStay: "",
    roomType: ROOM_TYPES.standard,
    bedNum: BED_OPTIONS.single,
    smoking: undefined,
    accessibility: undefined,
    view: undefined,
    balcony: undefined,
    pets: undefined,
  };
};
