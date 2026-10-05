import { CURRENCIES } from "../../../../config/enums";
import type { RoomStruct } from "../../structs/RoomStruct";

export const createEmptySimpleRoom = (): RoomStruct => ({
  _id: "",
  floor: 0,
  roomnum: 0,
  type: "standard",
  bednum: "single",
  smoking: false,
  accessibility: false,
  view: "none",
  balcony: false,
  status: "available",
  housekeeping: "clean",
  lastcleaned: new Date(),
  linkedroom: false,
  pets: false,
  currentStay: null,
  rate: 0,
  currency: CURRENCIES.rsd,
  photos: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});
