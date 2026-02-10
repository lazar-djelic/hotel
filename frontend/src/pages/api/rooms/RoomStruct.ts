export interface RoomStruct {
  _id: string;
  floor: number;
  roomnum: number;
  type: string;
  bednum: string;
  smoking: boolean;
  accessibility: boolean;
  view: string;
  balcony: boolean;
  status: string;
  housekeeping: string;
  lastcleaned: string;
  linkedroom: boolean;
  pets: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SimpleRoomStruct = {
  floor: number;
  roomnum: number;
  type: string;
  bednum: string;
  smoking: boolean;
  accessibility: boolean;
  view: string;
  balcony: boolean;
  status: string;
  housekeeping: string;
  lastcleaned: string;
  linkedroom: boolean;
  pets: boolean;
};
