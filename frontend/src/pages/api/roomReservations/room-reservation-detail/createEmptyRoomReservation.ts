import {
  BED_OPTIONS,
  RESERVATION_STATUS,
  ROOM_TYPES,
} from "../../../../config/enums";
import type {
  SimpleRoomResCreateReceptionStruct,
  SimpleRoomResCreateStruct,
  SimpleRoomReservationStruct,
} from "../../structs/RoomReservationStruct";

export const createEmptyRoomReservation =
  (): SimpleRoomResCreateReceptionStruct => {
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
      guest: "",
      startDate: now,
      endDate: now,
      adults: 1,
      children: 0,
      _id: "",
      createdAt: now,
      updatedAt: now,
      roomType: ROOM_TYPES.standard,
      bedNum: BED_OPTIONS.single,
      smoking: undefined,
      accessibility: undefined,
      view: undefined,
      balcony: undefined,
      pets: undefined,
    };
  };

export const createEmptyRoomResGuest = (): SimpleRoomResCreateStruct => {
  const now = new Date();
  return {
    guest: "",
    startDate: now,
    endDate: now,
    adults: 1,
    children: 0,
    roomType: ROOM_TYPES.standard,
    bedNum: BED_OPTIONS.single,
    smoking: undefined,
    accessibility: undefined,
    view: undefined,
    balcony: undefined,
    pets: undefined,
  };
};
