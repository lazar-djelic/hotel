import { useCallback } from "react";
import type { SimpleStayCreateStruct } from "../../structs/StayStruct";
import { findGuest } from "../../guests/guests.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { GuestStruct } from "../../structs/GuestStruct";

interface UseFindGuestProps {
  form: SimpleStayCreateStruct;
  setForm: (form: SimpleStayCreateStruct) => void;
  setGuestFound: (found: boolean) => void;
  setGuest: (data: GuestStruct) => void;
  t: (key: string) => string | undefined;
}

export const useFindGuestStay = ({
  form,
  setForm,
  setGuestFound,
  setGuest,
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
        toast.error("Guest not found");
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
      setGuest(guest);
      toast.success("Guest found");
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        (error as any)?.response?.data?.message || "Error searching for guest",
      );
    },
  });

  return { searchGuest, isSearching };
};
