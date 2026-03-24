import type { SimpleAmenityCreateReservationReceptionStruct } from "../../structs/AmenityReservation";

export const createEmptyAmenityReservation =
  (): SimpleAmenityCreateReservationReceptionStruct => {
    const now = new Date();
    return {
      fName: "",
      lName: "",
      phone: "",
      email: "",
      address: "",
      personalID: "",
      birthDate: new Date(),
      notes: "",
      date: new Date(),
      guest: "",
      amenity: "",
      user: null,
      startTime: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      ),
      endTime: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      ),
      numberOfPeople: 1,
      status: "booked",
    };
  };
