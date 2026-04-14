import api from "../../../lib/axios";
import type { SimpleTaxesStruct, TaxesStruct } from "../structs/TaxesStruct";

export const createUpdateTaxes = async ({
  taxes,
}: {
  taxes: SimpleTaxesStruct;
}): Promise<void> => {
  console.log(taxes);
  await api.post(`/taxes`, taxes);
};

export const fetchTaxes = async (): Promise<TaxesStruct> => {
  const res = await api.get("/taxes");
  return res.data;
};

export const deleteTaxes = async (): Promise<void> => {
  const res = await api.delete("/taxes");
  return res.data;
};
