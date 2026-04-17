import api from "../../../lib/axios";
import type {
  CancelPeriodStruct,
  SimpleCancelPeriodStruct,
} from "../structs/CancelPeriodStruct";

export const createUpdateCancelPeriod = async ({
  cancelPeriod,
}: {
  cancelPeriod: SimpleCancelPeriodStruct;
}): Promise<void> => {
  console.log(cancelPeriod);
  await api.post(`/cancel`, cancelPeriod);
};

export const fetchCancelPeriod = async (): Promise<CancelPeriodStruct> => {
  const res = await api.get("/cancel");
  return res.data;
};

export const deleteCancelPeriod = async (): Promise<void> => {
  const res = await api.delete("/cancel");
  return res.data;
};
