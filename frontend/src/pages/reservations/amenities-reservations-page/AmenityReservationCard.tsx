import type { FC } from "react";
import { Link } from "react-router";
import { formatTime } from "../../../lib/utils";
import { useTranslation } from "react-i18next";
import type { AmenityReservationStruct } from "../../api/structs/AmenityReservation";

type AmenityReservationCardArgs = {
  reservation: AmenityReservationStruct;
};

const AmenityReservationCard: FC<AmenityReservationCardArgs> = ({
  reservation,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <Link
      to={`/reception/amenity-reservation/${reservation._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid"
    >
      <div className="card-body">
        <h4 className="card-title text-base-content">
          {reservation.guest
            ? `${reservation.guest.fName} ${reservation.guest.lName}`
            : "No Guest"}
        </h4>
        <p className="text-base-content/70">
          {t("amenityRes.startTime")} :{" "}
          {formatTime(reservation.startTime.toString())}
        </p>
        <p className="text-base-content/70">
          {t("amenityRes.endTime")} :{" "}
          {formatTime(reservation.endTime.toString())}
        </p>
        <p className="text-base-content/70">
          {t("amenityRes.numOfPeople")} : {reservation.numberOfPeople}
        </p>
        <p className="text-base-content/70">
          {t("amenityRes.status")}:{" "}
          {t(`amenityRes.statusEnum.${reservation.status}`)}
        </p>
      </div>
    </Link>
  );
};

export default AmenityReservationCard;
