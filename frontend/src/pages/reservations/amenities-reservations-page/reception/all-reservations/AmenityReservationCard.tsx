import type { FC } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { formatTime } from "../../../../../lib/utils";
import type { AmenityReservationStruct } from "../../../../api/structs/AmenityReservation";
import { ROUTES } from "../../../../../config/routes";

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
      to={`${ROUTES.RECEPTION.AM_RES}/${reservation._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid"
    >
      <div className="card-body">
        <h4 className="card-title text-base-content">
          {reservation.guest
            ? `${reservation.guest.fName} ${reservation.guest.lName}`
            : t("guests.noguest")}
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
        <p className="text-base-content/70">
          {t("roomres.paid")} {reservation.paid ? t("yes") : t("no")}
        </p>
      </div>
    </Link>
  );
};

export default AmenityReservationCard;
