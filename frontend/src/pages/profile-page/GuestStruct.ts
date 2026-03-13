export interface GuestStruct {
  _id: string;
  fName: string;
  lName: string;
  phone: number;
  email: string;
  address: string;
  personalID: number;
  birthDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type SimpleGuestStruct = {
  fName: string;
  lName: string;
  phone: number;
  email: string;
  address: string;
  personalID: number;
  birthDate: string;
  notes?: string;
};
