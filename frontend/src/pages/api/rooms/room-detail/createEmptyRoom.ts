import type { RoomStruct } from "../RoomStruct";

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
  lastcleaned: new Date().toISOString().split("T")[0],
  linkedroom: false,
  pets: false,
  createdAt: "",
  updatedAt: "",
});
