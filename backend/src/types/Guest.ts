export type Guest = {
  _id: string;
  fName: string;
  lName: string;
  phone: string;
  email: string;
  address: string;
  personalID: string;
  birthDate: Date;
  notes?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
};
