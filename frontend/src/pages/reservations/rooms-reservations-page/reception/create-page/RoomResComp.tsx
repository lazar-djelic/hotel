import { useTranslation } from "react-i18next";
import type { SimpleRoomResCreateReceptionStruct } from "../../../../api/structs/RoomReservationStruct";
import {
  BED_OPTIONS,
  ROOM_TYPES,
  VIEW_OPTIONS,
  type BedOptions,
  type RoomTypes,
  type ViewOptions,
} from "../../../../../config/enums";
import { useState } from "react";
import { useFindFilteredRooms } from "../../../../api/rooms/find-filtered-rooms/useFindFilteredRooms";
import toast from "react-hot-toast";
import { SimpleFindFilteredRoomsRequestSchema } from "../../../../../schemas/room.response.schema";
import { ArrowLeftIcon } from "lucide-react";
import { useFindExactFilteredRooms } from "../../../../api/rooms/find-filtered-rooms/useFindExactFilteredRooms";

interface RoomResCompProps {
  current: SimpleRoomResCreateReceptionStruct;
  setForm: (form: SimpleRoomResCreateReceptionStruct) => void;
  setScreen: (value: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

const RoomResComp = ({
  current,
  setForm,
  setScreen,
  handleSubmit,
  isPending,
}: RoomResCompProps) => {
  const { t } = useTranslation();

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
  const [searched, setSearched] = useState(false);
  const [searchType, setSearchType] = useState<"exact" | "loose" | null>(null);

  const displayRooms =
    searchType === "exact" ? erooms : searchType === "loose" ? rooms : [];

  const clickHandle = (exact: boolean) => {
    const parsed = SimpleFindFilteredRoomsRequestSchema.safeParse({
      roomType: current.roomType,
      bedNum: current.bedNum,
      view: current.view,
      smoking: current.smoking,
      accessibility: current.accessibility,
      balcony: current.balcony,
      pets: current.pets,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      toast.error(firstError);
      return;
    }

    setSearched(true);
    setSearchType(exact ? "exact" : "loose");

    if (exact) {
      mutateE(parsed.data);
    } else {
      mutate(parsed.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold mb-4">{t("roomres.details")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="divider mt-8 mb-8">Room preferences</div>

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
            value={current.view === undefined ? "" : current.view.toString()}
            onChange={(e) => {
              const value =
                e.target.value === ""
                  ? undefined
                  : (e.target.value as ViewOptions);
              setForm({
                ...current,
                view: value,
              });
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
              current.smoking === undefined ? "" : current.smoking.toString()
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
              current.balcony === undefined ? "" : current.balcony.toString()
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
            value={current.pets === undefined ? "" : current.pets.toString()}
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
            }}
          >
            <option value="">{t("roomres.nofilter")}</option>
            <option value={"true"}>{t("yes")}</option>
            <option value={"false"}>{t("no")}</option>
          </select>
        </div>

        <div className="form-control justify-end">
          <div className="flex justify-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                clickHandle(true);
              }}
            >
              {t("checkin.checkexact")}
            </button>
          </div>

          <div className="flex justify-center mt-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                clickHandle(false);
              }}
            >
              {t("checkin.checkloose")}
            </button>
          </div>
        </div>
      </div>

      {searched &&
        ((searchType === "exact" && !loadER && erooms.length === 0) ||
          (searchType === "loose" && !loadR && rooms.length === 0)) && (
          <div className="alert alert-error text-black text-center rounded-md mt-4">
            {t("roomres.noroomscriteria")}
          </div>
        )}

      {searched &&
        ((searchType === "exact" && !loadER && erooms.length > 0) ||
          (searchType === "loose" && !loadR && rooms.length > 0)) && (
          <div className="alert alert-success text-black text-center rounded-md mt-4">
            {t("roomres.availcriteria")}
          </div>
        )}

      <div className="flex justify-between mx-auto mt-4">
        <button
          type="button"
          className="btn btn-secondary mt-4"
          onClick={() => {
            setScreen(2);
          }}
        >
          <ArrowLeftIcon className="size-5" />
          {t("previouspage")}
        </button>

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
