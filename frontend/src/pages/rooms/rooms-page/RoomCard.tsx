import { useEffect, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import type { RoomStruct } from "../../api/structs/RoomStruct";
import { formatDate } from "../../../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ROUTES } from "../../../config/routes";
import { Link } from "react-router";

type RoomCardArgs = {
  room: RoomStruct;
  expanded: boolean | null;
};

const RoomCard: FC<RoomCardArgs> = ({ room, expanded }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (expanded !== null) {
      setClicked(expanded);
    }
  }, [expanded]);

  return (
    <div onClick={() => setClicked(!clicked)}>
      {!clicked && (
        <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid">
          <div className="card-body">
            <h1 className="card-title text-base-content">
              <Link
                to={`${ROUTES.ADMIN.ROOM}/${room._id}`}
                className="text-3xl"
              >
                {room.roomnum}
              </Link>
              <button type="button" className="ml-auto cursor-pointer">
                <ChevronDown />
              </button>
            </h1>
            <p className="text-base-content/70">
              {t("create.room.status")}:{" "}
              {t("create.room.statusoptions." + room.status)}
            </p>
          </div>
        </div>
      )}

      {clicked && (
        <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-solid">
          <div className="card-body">
            <h1 className="card-title text-base-content">
              <Link
                to={`${ROUTES.ADMIN.ROOM}/${room._id}`}
                className="text-3xl"
              >
                {room.roomnum}
              </Link>
              <button type="button" className="ml-auto cursor-pointer">
                <ChevronUp />
              </button>
            </h1>
            <p className="text-base-content/70">
              {t("create.room.floor")}: {room.floor}
            </p>
            <p className="text-base-content/70">
              {t("create.room.type")}:{" "}
              {t("create.room.typeoptions." + room.type)}
            </p>
            <p className="text-base-content/70">
              {t("create.room.bednum")}:{" "}
              {t("create.room.bedoptions." + room.bednum)}
            </p>
            <p className="text-base-content/70">
              {t("create.room.smoking")}: {room.smoking ? t("yes") : t("no")}
            </p>
            <p className="text-base-content/70">
              {t("create.room.accessibility")}:{" "}
              {room.accessibility ? t("yes") : t("no")}
            </p>
            <p className="text-base-content/70">
              {t("create.room.view")}:{" "}
              {t("create.room.viewoptions." + room.view)}
            </p>
            <p className="text-base-content/70">
              {t("create.room.balcony")}: {room.balcony ? t("yes") : t("no")}
            </p>
            <p className="text-base-content/70">
              {t("create.room.status")}:{" "}
              {t("create.room.statusoptions." + room.status)}
            </p>
            <p className="text-base-content/70">
              {t("create.room.housekeeping")}:{" "}
              {t("create.room.housekeepingoptions." + room.housekeeping)}
            </p>
            <p className="text-base-content/70">
              {t("create.room.lastcleaned")}:{" "}
              {formatDate(room.lastcleaned.toString(), i18n.language)}
            </p>
            <p className="text-base-content/70">
              {t("create.room.linkedroom")}:{" "}
              {room.linkedroom ? t("yes") : t("no")}
            </p>
            <p className="text-base-content/70">
              {t("create.room.pets")}: {room.pets ? t("yes") : t("no")}
            </p>
            <p className="text-base-content/70">
              {t("create.room.rate")}: {room.rate + " " + room.currency}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
