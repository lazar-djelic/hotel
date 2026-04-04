import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { findGuest } from "../../../../api/guests/guests.api";
import type { SimpleAmResCreateReceptionStruct } from "../../../../api/structs/AmenityReservation";

interface UseFindGuestProps {
  form: SimpleAmResCreateReceptionStruct;
  setForm: (form: SimpleAmResCreateReceptionStruct) => void;
  setGuestFound: (found: boolean) => void;
  t: (key: string) => string;
}

export const useFindGuestAmRes = ({
  form,
  setForm,
  setGuestFound,
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
        user: null,
      });
      setGuestFound(true);
      toast.success(t("toast.guestfound"));
    },
    onError: (error) => {
      toast.error(t("toast.guestfindfail"));
    },
  });

  return { searchGuest, isSearching };
};
