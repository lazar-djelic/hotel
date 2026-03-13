import api from "../../../lib/axios";
import type {
  GuestStruct,
  SimpleGuestStruct,
} from "../../profile-page/GuestStruct";

export const fetchGuests = async (): Promise<GuestStruct[]> => {
  const res = await api.get("/guests");
  return res.data;
};

export const deleteGuest = async (id: string): Promise<void> => {
  await api.delete(`/guests/${id}`);
};

export const fetchGuest = async (id: string): Promise<GuestStruct> => {
  const res = await api.get(`/guests/${id}`);
  return res.data;
};

export const editGuest = async ({
  id,
  guest,
}: {
  id: string;
  guest: SimpleGuestStruct;
}) => {
  await api.put(`/guests/${id}`, guest);
};
