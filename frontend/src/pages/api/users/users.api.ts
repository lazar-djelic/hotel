import type { Role } from "../../../config/enums";
import api from "../../../lib/axios";
import type { GetUserStruct } from "../structs/UserStruct";

export const fetchUsers = async (): Promise<GetUserStruct[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const changeRoles = async ({
  id,
  role,
}: {
  id: string;
  role: Role;
}): Promise<void> => {
  console.log(id, role);
  const res = await api.post(`/admin/role/${id}`, { role });
  return res.data;
};
