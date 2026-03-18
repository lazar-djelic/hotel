export interface GuestStruct {
  _id: string;
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type SimpleGuestStruct = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: string;
  notes?: string;
};
