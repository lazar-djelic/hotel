import type { FC } from "react";
import type { ReservationStruct } from "../api/reservations/ReservationStruct";
import { Link } from "react-router";
import { formatDate } from "../../lib/utils";
import { useTranslation } from "react-i18next";

type ReservationCardArgs = {
  reservation: ReservationStruct;
};

const ReservationCard: FC<ReservationCardArgs> = ({ reservation }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <Link
      to={`/reservations/${reservation._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid"
    >
      <div className="card-body">
        <h4 className="card-title text-base-content">
          {reservation.guest.fName} {reservation.guest.lName}
        </h4>
        <p className="text-base-content/70">
          {t("rescard.startd")}:{" "}
          {formatDate(reservation.startDate.toString(), i18n.language)}
        </p>
        <p className="text-base-content/70">
          {t("rescard.endd")}:{" "}
          {formatDate(reservation.endDate.toString(), i18n.language)}
        </p>
        <p className="text-base-content/70">
          {t("rescard.rtype")}: {reservation.roomType}
        </p>
        <p className="text-base-content/70">
          {t("rescard.bednum")}: {reservation.bedNum}
        </p>
      </div>
    </Link>
  );
};

export default ReservationCard;
