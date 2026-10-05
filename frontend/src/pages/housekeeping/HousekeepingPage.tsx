import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRooms } from "../api/rooms/all-rooms/useRooms";
import { HOUSEKEEPING_OPTIONS } from "../../config/enums";
import { useChangeHousekeeping } from "../api/housekeeping/useChangeHousekeeping";
import { formatDate } from "../../lib/utils";
import i18n from "../../i18n";
import { useState } from "react";
import { useHousekeepingRooms } from "../api/housekeeping/useHousekeepingRooms";

const HousekeepingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { rooms, loading } = useRooms();
  const { priorityrooms, loadingP } = useHousekeepingRooms();
  const { mutate: changeHousekeeping, isPending } =
    useChangeHousekeeping(navigate);
  const [search, setSearch] = useState("");
  const [usePrio, setUsePrio] = useState(true);

  const filteredRooms = rooms.filter((room) =>
    room.roomnum.toString().includes(search),
  );

  const housekeepingOptions = Object.entries(HOUSEKEEPING_OPTIONS).map(
    ([key, value]) => ({
      value: value,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }),
  );

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <div className="mb-16 text-5xl font-semibold">{t("room.rooms")}</div>

      {loading && (
        <div className="text-center text-primary py-10">{t("loading")}</div>
      )}

      {!loading && rooms.length === 0 && (
        <>
          <div className="max-w-7xl mx-auto p-4 mt-8">
            <div className="text-center text-primary py-10">
              {t("room.norooms")}
            </div>
          </div>
        </>
      )}

      {rooms.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder={t("room.search")}
                  className="input input-bordered w-full max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <span className="label-text">{t("useprio")}</span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={usePrio}
                  onChange={(e) => setUsePrio(e.target.checked)}
                />
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-lg w-full">
              <thead>
                <tr className="bg-base-300">
                  <th>{t("room.roomnum")}</th>
                  <th>{t("room.status")}</th>
                  <th>{t("room.housekeeping")}</th>
                  <th>{t("room.lastcleaned")}</th>
                </tr>
              </thead>
              <tbody>
                {(usePrio ? priorityrooms : filteredRooms).map(
                  (room, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => {}}
                        className="cursor-pointer transition-all border-l-4
               border-l-blue-400
               bg-[rgba(96,165,250,0.08)] hover:bg-[rgba(96,165,250,0.12)]"
                      >
                        <td className="font-medium">{room.roomnum}</td>
                        <td className="font-medium">
                          {t(`create.room.statusoptions.${room.status}`)}
                        </td>
                        <td>
                          <select
                            value={room.housekeeping}
                            onChange={(e) =>
                              changeHousekeeping({
                                id: room._id,
                                status: e.target.value as any,
                              })
                            }
                            disabled={isPending}
                            className="select select-bordered select-sm"
                          >
                            {housekeepingOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {t(
                                  `create.room.housekeepingoptions.${option.label.toLowerCase()}`,
                                )}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          {formatDate(
                            room.lastcleaned.toString(),
                            i18n.language,
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default HousekeepingPage;
