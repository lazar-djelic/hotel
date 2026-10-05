import api from "../../../lib/axios";

export const cancelRoomres = async ({ id }: { id: string }): Promise<void> => {
  await api.post(`/cancel-res/roomres`, { id });
};

export const cancelAmres = async ({ id }: { id: string }): Promise<void> => {
  await api.post(`/cancel-res/amres`, { id });
};
