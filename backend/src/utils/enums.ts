export const USER_ROLE = {
  guest: "guest",
  admin: "admin",
  receptionist: "receptionist",
  housekeeping: "housekeeping",
} as const;

export type Role = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const STAY_STATUS = {
  checked_in: "checked_in",
  checked_out: "checked_out",
  cancelled: "cancelled",
  no_show: "no_show",
} as const;

export type StStatus = (typeof STAY_STATUS)[keyof typeof STAY_STATUS];

export const CURRENCIES = {
  rsd: "RSD",
  eur: "EUR",
};

export type CurrType = (typeof CURRENCIES)[keyof typeof CURRENCIES];

export const RESERVATION_STATUS = {
  booked: "booked",
  confirmed: "confirmed",
  checked_in: "checked_in",
  cancelled: "cancelled",
} as const;

export type ResStatus =
  (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS];

export const ROOM_STATUS = {
  available: "available",
  reserved: "reserved",
  occupied: "occupied",
  outofservice: "outofservice",
} as const;

export type RoomStatus = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];

export const HOUSEKEEPING_OPTIONS = {
  clean: "clean",
  dirty: "dirty",
  in_progress: "in_progress",
  inspected: "inspected",
} as const;

export type HousekeepingOptions =
  (typeof HOUSEKEEPING_OPTIONS)[keyof typeof HOUSEKEEPING_OPTIONS];
