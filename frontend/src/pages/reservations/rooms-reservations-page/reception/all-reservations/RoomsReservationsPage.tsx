import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import { useRoomReservations } from "../../../../api/roomReservations/all-roomReservations/useRoomReservations";
import { PlusIcon } from "lucide-react";
import DoubleCalendar from "../../../DoubleCalendar";
import RoomReservationCard from "./RoomReservationCard";

const RoomsReservationsPage = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [, setSearchParams] = useSearchParams();
  const { reservations, isLoading } = useRoomReservations(
    dateRange[0],
    setSearchParams,
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <div style={{ display: "flex" }} className="mb-16">
          <div className="text-5xl font-semibold">{t("roomRes.title")}</div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Link
              to="/reception/create-room-reservation"
              className="btn btn-outline text-lg"
            >
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
                    <RoomReservationCard
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

export default RoomsReservationsPage;
