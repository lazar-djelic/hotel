import { useState } from "react";
// import api from "../lib/axios.ts";
import Navbar from "../../components/Navbar.tsx";
import DoubleCalendar from "./DoubleCalendar.tsx";
import { useReservations } from "./useReservations.ts";

const ReservationsPage = () => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const { loading } = useReservations();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading reservations...
          </div>
        )}

        {/* {reservations.length === 0 && <div className="text-center text-primary py-10">There are no reservations yet.</div>} */}

        <DoubleCalendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>
    </div>
  );
};

export default ReservationsPage;
