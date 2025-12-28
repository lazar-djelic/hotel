import { useState } from "react";
import Navbar from "../../components/Navbar";
import DoubleCalendar from "./DoubleCalendar";
import { useReservations } from "./useReservations";
import ReservationCard from "./ReservationCard";

const ReservationsPage = () => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const { reservations, isLoading } = useReservations(dateRange[0]);

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="order-1 md:order-1 lg:order-1">
                <div className="text-center text-primary py-10">
                  There are no reservations for selected period yet.
                </div>
              </div>

              <div className="order-2 md:order-2 lg:order-2">
                <DoubleCalendar
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
          </>
        )}

        {reservations.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="order-2 md:order-1 lg:order-1">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                  {reservations.map((reservation) => (
                    <ReservationCard
                      key={reservation._id}
                      reservation={reservation}
                    />
                  ))}
                </div>
              </div>

              <div className="order-1 md:order-2 lg:order-2">
                <DoubleCalendar
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
