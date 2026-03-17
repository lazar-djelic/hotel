export const USER_ROLE = {
  guest: "guest",
  admin: "admin",
  receptionist: "receptionist",
  housekeeping: "housekeeping",
} as const;

export type Role = (typeof USER_ROLE)[keyof typeof USER_ROLE];
