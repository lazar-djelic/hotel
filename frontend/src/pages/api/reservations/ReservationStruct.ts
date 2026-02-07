export interface ReservationStruct {
  _id: string;
  fName: string;
  lName: string;
  startDate: string;
  endDate: string;
  roomType: string;
  bedNum: string;
  createdAt: string;
  updatedAt: string;
}

export type SimpleReservationStruct = {
  fName: string;
  lName: string;
  startDate: string;
  endDate: string;
  roomType: string;
  bedNum: string;
};
