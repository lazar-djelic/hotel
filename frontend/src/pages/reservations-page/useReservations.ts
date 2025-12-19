import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useReservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // const res = await api.get("/reservations");
        // console.log(res.data);
        // setReservations(res.data);
      } catch (error) {
        console.log("Error fetching reservations");
        toast.error("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { loading, reservations };
};
