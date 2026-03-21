import "express-session";
import type { Role } from "../utils/enums.ts";

declare module "express-session" {
  interface SessionData {
    userId: string;
    role: Role;
    guest: string;
  }
}
