import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/api/users/me", {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
    staleTime: 0,
  });
};
