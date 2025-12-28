import { useQuery } from "@tanstack/react-query";
import type { HotelConfig } from "./struct";
import { QUERY_KEYS } from "../../../config/query-keys";
import { fetchConfQueryFn } from "./configQueryFn";
import { useEffect, useState } from "react";

export const fetchHotelConfig = () => {
  // const { data: conf } = useQuery<HotelConfig>({
  //   queryKey: [QUERY_KEYS.CONFIGURATION.CONF],
  //   queryFn: fetchConfQueryFn,
  // });

  const [conf, setConf] = useState<HotelConfig>({ _id: "", levels: 0 });

  useEffect(() => {
    fetchConfQueryFn().then((data) => setConf(data));
  }, []);

  return {
    conf,
  };
};
