import toast from "react-hot-toast";
import { guestSimpleSchema } from "../../schemas/guest.response.schema";
import type {
  GuestStruct,
  SimpleGuestStruct,
} from "../api/structs/GuestStruct";
import type { SimpleStayCreateStruct } from "../api/structs/StayStruct";
import type { TFunction } from "i18next";

export const checkData = (
  current: SimpleStayCreateStruct,
  guest: GuestStruct | undefined,
  isNewG: boolean,
  setScreen: (num: number) => void,
  t: TFunction,
) => {
  const tmpGuest: SimpleGuestStruct = {
    fName: current.fName,
    lName: current.lName,
    phone: current.phone,
    email: current.email,
    address: current.address,
    personalID: current.personalID,
    birthDate: current.birthDate,
    notes: current.notes,
  };

  const parsed = guestSimpleSchema.safeParse(tmpGuest);

  if (!parsed.success) {
    toast.error(t("toast.invalidguestinput"));
    return null;
  }

  if (isNewG) {
    if (guest !== undefined) {
      const { _id, createdAt, updatedAt, ...cleanGuest } = guest;

      if (JSON.stringify(cleanGuest) === JSON.stringify(tmpGuest)) {
        setScreen(3);
        return null;
      } else
        return {
          action: "create" as const,
          guest: tmpGuest,
        };
    } else {
      return {
        action: "create" as const,
        guest: tmpGuest,
      };
    }
  } else {
    if (guest !== undefined) {
      const { _id, createdAt, updatedAt, ...cleanGuest } = guest;

      if (JSON.stringify(cleanGuest) !== JSON.stringify(tmpGuest)) {
        return {
          action: "update" as const,
          guestId: current.guest!,
          guest: tmpGuest,
        };
      } else {
        setScreen(3);
        return null;
      }
    }
  }

  return null;
};
