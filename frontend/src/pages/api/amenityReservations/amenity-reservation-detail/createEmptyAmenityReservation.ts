import type {
  SimpleAmResCreateReceptionStruct,
  SimpleAmResCreateStruct,
} from "../../structs/AmenityReservation";

export const createEmptyAmenityReservation =
  (): SimpleAmResCreateReceptionStruct => {
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
      _id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      payNow: true,
    };
  };

export const createEmptyAmResGuest = (): SimpleAmResCreateStruct => {
  const now = new Date();
  return {
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
    payNow: true,
  };
};
