import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAmenities } from "../../../../api/amenities/all-amenities/useAmenities";
import DoubleCalendar from "../../../DoubleCalendar";
import AmenityReservationCard from "./AmenityReservationCard";
import { useAmenityReservations } from "../../../../api/amenityReservations/all-amenityReservations/useAmenityReservations";

const AmenitiesReservationsPage = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [, setSearchParams] = useSearchParams();
  const { amenities } = useAmenities();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (amenities.length > 0 && !initializedRef.current) {
      const firstReservableAmenity = amenities.find(
        (amenity) => amenity.requiresReservation,
      );
      if (firstReservableAmenity) {
        setSelectedOption(firstReservableAmenity._id);
        initializedRef.current = true;
      }
    }
  }, [amenities]);

  const { reservations, loading } = useAmenityReservations(
    dateRange[0],
    selectedOption,
    setSearchParams,
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <div style={{ display: "flex" }} className="mb-16">
          <div className="text-5xl font-semibold">{t("amenityRes.title")}</div>

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
              value={selectedOption ?? ""}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {amenities
                .filter((amenity) => amenity.requiresReservation)
                .map((amenity) => (
                  <option key={amenity._id} value={amenity._id}>
                    {amenity.name}
                  </option>
                ))}
            </select>

            <Link
              to="/reception/create-amenity-reservation"
              className="btn btn-outline text-lg"
            >
              <PlusIcon className="size-8" />
              {t("newres")}
            </Link>
          </div>
        </div>

        {loading && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        {!loading && reservations.length === 0 && (
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
                    <AmenityReservationCard
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

export default AmenitiesReservationsPage;
