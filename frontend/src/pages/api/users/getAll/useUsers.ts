import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../config/query-keys";
import { fetchUsers } from "../users.api";
import { getuserSchema } from "../../../../schemas/user.response.schema";
import type { GetUserStruct } from "../../structs/UserStruct";

export const useUsers = () => {
  const { data: users = [], isLoading } = useQuery<GetUserStruct[]>({
    queryKey: [QUERY_KEYS.USERS.USERS],
    queryFn: async () => {
      const rawUsers = await fetchUsers();
      console.log(rawUsers);
      const parsed = getuserSchema.safeParse(rawUsers);
      if (!parsed.success) {
        console.error("Invalid users data", parsed.error.issues);
        return [];
      }
      return parsed.data;
    },
  });

  return {
    users,
    loading: isLoading,
  };
};
