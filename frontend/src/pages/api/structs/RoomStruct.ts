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
  lastcleaned: Date;
  linkedroom: boolean;
  pets: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  lastcleaned: Date;
  linkedroom: boolean;
  pets: boolean;
};
