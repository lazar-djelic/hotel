import "express-session";
import type { Role } from "../utils/roleEnums.ts";

declare module "express-session" {
  interface SessionData {
    userId: string;
    role: Role;
    guest: string;
  }
}
