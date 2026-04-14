import { useTranslation } from "react-i18next";
import type { SimpleRoomResCreateStruct } from "../../../api/structs/RoomReservationStruct";
import {
  BED_OPTIONS,
  ROOM_TYPES,
  VIEW_OPTIONS,
  type BedOptions,
  type RoomTypes,
  type ViewOptions,
} from "../../../../config/enums";
import type { getRoom } from "../../../../types/RoomType";
import type { getRoomStruct } from "../../../api/structs/RoomStruct";
import { useFindFilteredRooms } from "../../../api/rooms/find-filtered-rooms/useFindFilteredRooms";
import { useFindExactFilteredRooms } from "../../../api/rooms/find-filtered-rooms/useFindExactFilteredRooms";
import { SimpleFindFilteredRoomsRequestSchema } from "../../../../schemas/room.response.schema";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SimpleDateInComp from "../../../../components/SimpleDateInComp";
import { formatDate } from "../../../../lib/utils";

const roomToRoomStruct = (room: getRoom): getRoomStruct => {
  return {
    ...room,
    currentStay: room.currentStay || undefined,
  } as getRoomStruct;
};

interface RoomResCompProps {
  current: SimpleRoomResCreateStruct;
  setForm: (form: SimpleRoomResCreateStruct) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

const RoomResComp = ({
  current,
  setForm,
  handleSubmit,
  isPending,
}: RoomResCompProps) => {
  const { t, i18n } = useTranslation();

  const [filters, setFilters] = useState({
    startDate: current.startDate,
    endDate: current.endDate,
    roomType: current.roomType,
    bedNum: current.bedNum,
    view: current.view,
    smoking: current.smoking,
    accessibility: current.accessibility,
    balcony: current.balcony,
    pets: current.pets,
  });

  const { mutate, isPending: loadR, data: rooms = [] } = useFindFilteredRooms();
  const {
    mutate: mutateE,
    isPending: loadER,
    data: erooms = [],
  } = useFindExactFilteredRooms();

  const performSearch = (filtersToSearch: typeof filters) => {
    const parsed =
      SimpleFindFilteredRoomsRequestSchema.safeParse(filtersToSearch);

    if (!parsed.success) {
      toast.error(t("toast.invalidinput"));
      return;
    }

    mutateE(parsed.data);
    mutate(parsed.data);
  };

  const getDays = () => {
    const start = current.startDate;
    const end = current.endDate;

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  };

  useEffect(() => {
    performSearch(filters);
  }, [filters]);

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold mb-4">
        {t("checkin.roomdetails")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SimpleDateInComp
              labelText={t("roomres.startd")}
              value={formatDate(current.startDate.toString(), i18n.language)}
              onChangeFn={(value) => {
                const newDate = new Date(value);
                setForm({ ...current, startDate: newDate });
                setFilters((prev) => ({
                  ...prev,
                  startDate: newDate,
                }));
              }}
            />

            <SimpleDateInComp
              labelText={t("roomres.endd")}
              value={formatDate(current.endDate.toString(), i18n.language)}
              onChangeFn={(value) => {
                const newDate = new Date(value);
                setForm({ ...current, endDate: newDate });
                setFilters((prev) => ({
                  ...prev,
                  endDate: newDate,
                }));
              }}
            />

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.adults")}</span>
              </label>
              <input
                className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={current.adults}
                min={0}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setForm({
                    ...current,
                    adults: value,
                  });
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.children")}</span>
              </label>
              <input
                className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={current.children}
                min={0}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setForm({
                    ...current,
                    children: value,
                  });
                }}
              />
            </div>
          </div>

          <div className="divider mt-8 mb-8">{t("checkin.roomprefs")}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.roomType")}</span>
              </label>
              <select
                className="select select-bordered"
                value={current.roomType}
                onChange={(e) => {
                  const value = e.target.value as RoomTypes;
                  setForm({
                    ...current,
                    roomType: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    roomType: value,
                  }));
                }}
              >
                {Object.values(ROOM_TYPES).map((r) => (
                  <option key={r} value={r}>
                    {t(`create.room.typeoptions.${r}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.bednum")}</span>
              </label>
              <select
                className="select select-bordered"
                value={current.bedNum}
                onChange={(e) => {
                  const value = e.target.value as BedOptions;
                  setForm({
                    ...current,
                    bedNum: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    bedNum: value,
                  }));
                }}
              >
                {Object.values(BED_OPTIONS).map((b) => (
                  <option key={b} value={b}>
                    {t(`create.room.bedoptions.${b}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.view")}</span>
              </label>
              <select
                className="select select-bordered"
                value={
                  current.view === undefined ? "" : current.view.toString()
                }
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : (e.target.value as ViewOptions);
                  setForm({
                    ...current,
                    view: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    view: value,
                  }));
                }}
              >
                <option value="">{t("roomres.nofilter")}</option>

                {Object.values(VIEW_OPTIONS).map((v) => (
                  <option key={v} value={v}>
                    {t(`create.room.viewoptions.${v}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.smoking")}</span>
              </label>
              <select
                className="select select-bordered"
                value={
                  current.smoking === undefined
                    ? ""
                    : current.smoking.toString()
                }
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : e.target.value === "true"
                        ? true
                        : false;
                  setForm({
                    ...current,
                    smoking: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    smoking: value,
                  }));
                }}
              >
                <option value="">{t("roomres.nofilter")}</option>
                <option value={"true"}>{t("yes")}</option>
                <option value={"false"}>{t("no")}</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.accessibility")}</span>
              </label>
              <select
                className="select select-bordered"
                value={
                  current.accessibility === undefined
                    ? ""
                    : current.accessibility.toString()
                }
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : e.target.value === "true"
                        ? true
                        : false;
                  setForm({
                    ...current,
                    accessibility: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    accessibility: value,
                  }));
                }}
              >
                <option value="">{t("roomres.nofilter")}</option>
                <option value={"true"}>{t("yes")}</option>
                <option value={"false"}>{t("no")}</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.balcony")}</span>
              </label>
              <select
                className="select select-bordered"
                value={
                  current.balcony === undefined
                    ? ""
                    : current.balcony.toString()
                }
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : e.target.value === "true"
                        ? true
                        : false;
                  setForm({
                    ...current,
                    balcony: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    balcony: value,
                  }));
                }}
              >
                <option value="">{t("roomres.nofilter")}</option>
                <option value={"true"}>{t("yes")}</option>
                <option value={"false"}>{t("no")}</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("roomres.pets")}</span>
              </label>
              <select
                className="select select-bordered"
                value={
                  current.pets === undefined ? "" : current.pets.toString()
                }
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : e.target.value === "true"
                        ? true
                        : false;
                  setForm({
                    ...current,
                    pets: value,
                  });
                  setFilters((prev) => ({
                    ...prev,
                    pets: value,
                  }));
                }}
              >
                <option value="">{t("roomres.nofilter")}</option>
                <option value={"true"}>{t("yes")}</option>
                <option value={"false"}>{t("no")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {t("checkin.availablerooms")} ({t("checkin.checkexact")})
                </span>
              </label>
              <select
                className="select select-bordered"
                value={current.assignedRoom?._id || ""}
                disabled={erooms.length == 0 ? true : false}
                onChange={(e) => {
                  const roomId = e.target.value;
                  const selectedRoom = erooms.find(
                    (room) => room._id === roomId,
                  );
                  setForm({
                    ...current,
                    assignedRoom: selectedRoom
                      ? roomToRoomStruct(selectedRoom)
                      : null,
                  });
                }}
              >
                <option value="">{t("checkin.selectroom")}</option>
                {erooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.roomnum}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {t("checkin.availablerooms")} ({t("checkin.checkloose")})
                </span>
              </label>
              <select
                className="select select-bordered"
                value={current.assignedRoom?._id || ""}
                disabled={rooms.length == 0 ? true : false}
                onChange={(e) => {
                  const roomId = e.target.value;
                  const selectedRoom = rooms.find(
                    (room) => room._id === roomId,
                  );
                  setForm({
                    ...current,
                    assignedRoom: selectedRoom
                      ? roomToRoomStruct(selectedRoom)
                      : null,
                  });
                }}
              >
                <option value="">{t("checkin.selectroom")}</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.roomnum}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!current.assignedRoom && (
            <div className="mt-6 border-2 flex flex-col flex-1 border-error">
              <div className="flex-1 bg-base-200 flex items-center justify-center">
                {t("checkin.roomnotsel")}
              </div>
            </div>
          )}

          {current.assignedRoom && (
            <div className="mt-6 border-2 flex flex-col flex-1 border-success">
              <div className="flex-1 bg-base-200 flex flex-col justify-center gap-4 p-4 overflow-y-auto">
                {current.assignedRoom.photos &&
                  current.assignedRoom.photos.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {current.assignedRoom.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Room ${index + 1}`}
                          className="w-128 h-128 object-cover rounded border border-base-300 flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}

                <p className="text-base-content/70 border-2 p-2 mx-auto">
                  {t("checkin.pricefor")} {getDays()} {t("checkin.nights")}{" "}
                  <b>
                    {getDays() * current.assignedRoom.rate}{" "}
                    {" " + current.assignedRoom.currency}
                  </b>
                </p>
                <p className="text-base-content/70">
                  {t("create.room.roomnum")}:{" "}
                  <b>{current.assignedRoom.roomnum}</b>
                </p>
                <p className="text-base-content/70">
                  {t("create.room.type")}:{" "}
                  {t("create.room.typeoptions." + current.assignedRoom.type)}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.bednum")}:{" "}
                  {t("create.room.bedoptions." + current.assignedRoom.bednum)}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.smoking")}:{" "}
                  {current.assignedRoom.smoking ? t("yes") : t("no")}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.accessibility")}:{" "}
                  {current.assignedRoom.accessibility ? t("yes") : t("no")}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.view")}:{" "}
                  {t("create.room.viewoptions." + current.assignedRoom.view)}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.balcony")}:{" "}
                  {current.assignedRoom.balcony ? t("yes") : t("no")}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.status")}:{" "}
                  {t(
                    "create.room.statusoptions." + current.assignedRoom.status,
                  )}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.housekeeping")}:{" "}
                  {t(
                    "create.room.housekeepingoptions." +
                      current.assignedRoom.housekeeping,
                  )}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.linkedroom")}:{" "}
                  {current.assignedRoom.linkedroom ? t("yes") : t("no")}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.pets")}:{" "}
                  {current.assignedRoom.pets ? t("yes") : t("no")}
                </p>
                <p className="text-base-content/70">
                  {t("create.room.rate")}:{" "}
                  {current.assignedRoom.rate +
                    " " +
                    current.assignedRoom.currency}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mx-auto mt-4">
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={isPending}
        >
          {!isPending && t("roomres.save")}
        </button>
      </div>
    </form>
  );
};

export default RoomResComp;
