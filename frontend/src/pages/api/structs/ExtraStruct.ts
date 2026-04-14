import type { Extra, GetExtra } from "../../../types/StayType";

export interface ExtraStruct {
  _id: string;
  extra: GetExtra;
  amount: number;
}

export type SimpleAddExtraStruct = {
  extra: string;
  amount: number;
};
