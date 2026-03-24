import type { Role } from "../../../config/enums";
import type { GuestStruct } from "./GuestStruct";

export interface UserStruct {
  _id: string;
  email: string;
  password: string;
  role: Role;
  guest: GuestStruct;
}

export type SimpleUserStruct = {
  email: string;
  password: string;
  role: Role;
  guest: string;
};
