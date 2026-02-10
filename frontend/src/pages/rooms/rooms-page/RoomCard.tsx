import type { FC } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { RoomStruct } from "../../api/rooms/RoomStruct";
import { formatDate } from "../../../lib/utils";

type RoomCardArgs = {
  room: RoomStruct;
};

const RoomCard: FC<RoomCardArgs> = ({ room }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <Link
      to={`/room/${room._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid"
    >
      <div className="card-body">
        <h4 className="card-title text-base-content">{room.roomnum}</h4>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.floor")}: {room.floor}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.type")}: {t("create.room.typeoptions." + room.type)}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.bednum")}:{" "}
          {t("create.room.bedoptions." + room.bednum)}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.smoking")}: {room.smoking ? t("yes") : t("no")}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.accessibility")}:{" "}
          {room.accessibility ? t("yes") : t("no")}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.view")}: {t("create.room.viewoptions." + room.view)}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.balcony")}: {room.balcony ? t("yes") : t("no")}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.status")}:{" "}
          {t("create.room.statusoptions." + room.status)}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.housekeeping")}:{" "}
          {t("create.room.housekeepingoptions." + room.housekeeping)}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.lastcleaned")}:{" "}
          {formatDate(room.lastcleaned, i18n.language)}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.linkedroom")}: {room.linkedroom ? t("yes") : t("no")}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          {t("create.room.pets")}: {room.pets ? t("yes") : t("no")}
        </p>
      </div>
    </Link>
  );
};

export default RoomCard;
