export interface GuestStruct {
  _id: string;
  fName: string;
  lName: string; //promeni
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SimpleGuestStruct = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: Date;
  notes?: string;
};
