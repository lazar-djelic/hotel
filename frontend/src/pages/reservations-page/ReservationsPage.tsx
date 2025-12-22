import { useState } from "react";
import Navbar from "../../components/Navbar";
import DoubleCalendar from "./DoubleCalendar";
import { useReservations } from "./useReservations";

const ReservationsPage = () => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const { data: reservations = [], isLoading } = useReservations();

  // treba da se doda zod validacija

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">
            Loading reservations...
          </div>
        )}

        {!isLoading && reservations.length === 0 && (
          <div className="text-center text-primary py-10">
            There are no reservations yet.
          </div>
        )}

        <DoubleCalendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>
    </div>
  );
};

export default ReservationsPage;
