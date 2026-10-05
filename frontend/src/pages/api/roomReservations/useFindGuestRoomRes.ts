import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { findGuest } from "../guests/guests.api";
import type { SimpleRoomResCreateReceptionStruct } from "../structs/RoomReservationStruct";

interface UseFindGuestProps {
  form: SimpleRoomResCreateReceptionStruct;
  setForm: (form: SimpleRoomResCreateReceptionStruct) => void;
  setGuestFound: (found: boolean) => void;
  setScreen: (value: number) => void;
  t: (key: string) => string;
}

export const useFindGuestRoomRes = ({
  form,
  setForm,
  setGuestFound,
  setScreen,
  t,
}: UseFindGuestProps) => {
  const mutationFn = useCallback(async () => {
    return await findGuest(
      form.email || undefined,
      form.personalID || undefined,
    );
  }, [form.email, form.personalID]);

  const { mutate: searchGuest, isPending: isSearching } = useMutation({
    mutationFn,
    onSuccess: (guest) => {
      if (!guest) {
        toast.error(t("toast.guestnotfound"));
        return;
      }
      setForm({
        ...form,
        fName: guest.fName,
        lName: guest.lName,
        phone: guest.phone,
        email: guest.email,
        address: guest.address,
        personalID: guest.personalID,
        birthDate: new Date(guest.birthDate),
        notes: guest.notes || "",
        guest: guest._id,
      });
      setGuestFound(true);
      setScreen(2);
      toast.success(t("toast.guestfound"));
    },
    onError: (error) => {
      console.log(error);
      toast.error(t("toast.guestfindfail"));
    },
  });

  return { searchGuest, isSearching };
};
