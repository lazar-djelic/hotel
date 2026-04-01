export const USER_ROLE = {
  guest: "guest",
  admin: "admin",
  receptionist: "receptionist",
  staff: "staff",
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
} as const;

export type CurrType = (typeof CURRENCIES)[keyof typeof CURRENCIES];

export const RESERVATION_STATUS = {
  booked: "booked",
  confirmed: "confirmed",
  checked_in: "checked_in",
  cancelled: "cancelled",
} as const;

export type ResStatus =
  (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS];

export const AM_RES_STATUS = {
  booked: "booked",
  confirmed: "confirmed",
  cancelled: "cancelled",
} as const;

export type AmResStatus = (typeof AM_RES_STATUS)[keyof typeof AM_RES_STATUS];

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

export const AMENITY_TYPES = {
  conference: "conference",
  spa: "spa",
  pool: "pool",
  restaurant: "restaurant",
  gym: "gym",
  sauna: "sauna",
} as const;

export type AmenityTypes = (typeof AMENITY_TYPES)[keyof typeof AMENITY_TYPES];

export const VIEW_OPTIONS = {
  none: "none",
  sea: "sea",
  city: "city",
  garden: "garden",
} as const;

export type ViewOptions = (typeof VIEW_OPTIONS)[keyof typeof VIEW_OPTIONS];

export const BED_OPTIONS = {
  single: "single",
  double: "double",
  twin: "twin",
} as const;

export type BedOptions = (typeof BED_OPTIONS)[keyof typeof BED_OPTIONS];

export const ROOM_TYPES = {
  standard: "standard",
  deluxe: "deluxe",
  suite: "suite",
  penthouse: "penthouse",
} as const;

export type RoomTypes = (typeof ROOM_TYPES)[keyof typeof ROOM_TYPES];

export const EXTRA_OPTIONS = {
  minibar: "Mini bar",
  roomservice: "Room service",
  restaurant: "Restaurant",
  bardrinks: "Bar drinks",
  breakfast: "Breakfast",
  laundry: "Laundry",
  drycleaning: "Dry cleaning",
  ironing: "Ironing",
  parking: "Parking",
  airporttransfer: "Airport transfer",
  taxiservice: "Taxi service",
  spa: "Spa",
  massage: "Massage",
  gympass: "Gym pass",
  pool: "Pool",
  latecheckin: "Late check-out fee",
  earlycheckin: "Early check-in fee",
  damages: "Damages",
  newkey: "Lost key / card replacement",
} as const;
