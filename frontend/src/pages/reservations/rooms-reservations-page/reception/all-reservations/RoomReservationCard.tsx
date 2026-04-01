import type { FC } from "react";
import type { RoomReservationStruct } from "../../../../api/structs/RoomReservationStruct";
import { Link } from "react-router";
import { formatDate } from "../../../../../lib/utils";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../../config/routes";

type RoomReservationCardArgs = {
  reservation: RoomReservationStruct;
};

const RoomReservationCard: FC<RoomReservationCardArgs> = ({ reservation }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <Link
      to={`${ROUTES.RECEPTION.ROOM_RES}/${reservation._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid"
    >
      <div className="card-body">
        <h4 className="card-title text-base-content">
          {reservation.guest.fName} {reservation.guest.lName}
        </h4>
        <p className="text-base-content/70">
          {t("roomres.startd")}
          {formatDate(reservation.startDate.toString(), i18n.language)}
        </p>
        <p className="text-base-content/70">
          {t("roomres.endd")}
          {formatDate(reservation.endDate.toString(), i18n.language)}
        </p>
        <p className="text-base-content/70">
          {t("roomres.adults")}
          {reservation.adults}
        </p>
        <p className="text-base-content/70">
          {t("roomres.children")}
          {reservation.children}
        </p>
        <p className="text-base-content/70">
          {t("roomres.assignedroom")}
          {reservation.assignedRoom.roomnum}
        </p>
        <p className="text-base-content/70">
          {t("roomres.status")}
          {t(`roomres.statusenum.${reservation.resStatus}`)}
        </p>
      </div>
    </Link>
  );
};

export default RoomReservationCard;
