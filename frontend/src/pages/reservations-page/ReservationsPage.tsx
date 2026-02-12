import { useState } from "react";
import Navbar from "../../components/Navbar";
import DoubleCalendar from "./DoubleCalendar";
import { useReservations } from "./useReservations";
import ReservationCard from "./ReservationCard";
import { Link, useSearchParams } from "react-router";
import { PlusIcon } from "lucide-react";
import { useConfig } from "../api/hotel-config/useConfig";
import { useTranslation } from "react-i18next";

const ReservationsPage = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [, setSearchParams] = useSearchParams();
  const { conf } = useConfig();

  const reservationOptions = Object.keys(conf || {}).filter(
    (key) => (conf as Record<string, any>)?.[key] === true,
  );
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );

  const { reservations, isLoading } = useReservations(
    dateRange[0],
    selectedOption ?? reservationOptions[0] ?? "",
    setSearchParams,
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        <div style={{ display: "flex" }} className="mb-8">
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <select
              className="select select-bordered"
              value={selectedOption ?? reservationOptions[0] ?? ""}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {reservationOptions.map((option: string, index: number) => (
                <option key={index} value={option}>
                  {t("config." + option)}
                </option>
              ))}
            </select>

            <Link to="/createreservation" className="btn btn-outline text-lg">
              <PlusIcon className="size-8" />
              {t("newres")}
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        {!isLoading && reservations.length === 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="order-1 md:order-1 lg:order-1">
                <div className="text-center text-primary py-10">
                  {t("nores")}
                </div>
              </div>

              <div className="order-2 md:order-2 lg:order-2 justify-self-end">
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

              <div className="order-1 md:order-2 lg:order-2 justify-self-end">
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
