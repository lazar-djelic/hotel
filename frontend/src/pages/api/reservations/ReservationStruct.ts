export interface ReservationStruct {
  _id: string;
  fName: string;
  lName: string;
  startDate: string;
  endDate: string;
  room: number;
  createdAt: string;
  updatedAt: string;
}

export type SimpleReservationStruct = {
  fName: string;
  lName: string;
  startDate: string;
  endDate: string;
  room: number;
};
