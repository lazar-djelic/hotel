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
  const { t } = useTranslation();

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
            onChange={(e) =>
              setForm({
                ...current,
                adults: Number(e.target.value),
              })
            }
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
            onChange={(e) =>
              setForm({
                ...current,
                children: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("roomres.roomType")}</span>
          </label>
          <select
            className="select select-bordered"
            value={current.roomType}
            onChange={(e) =>
              setForm({
                ...current,
                roomType: e.target.value as RoomTypes,
              })
            }
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
            onChange={(e) =>
              setForm({
                ...current,
                bedNum: e.target.value as BedOptions,
              })
            }
          >
            {Object.values(BED_OPTIONS).map((b) => (
              <option key={b} value={b}>
                {t(`create.room.bedoptions.${b}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="divider mt-8 mb-8">Room preferences</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("roomres.view")}</span>
          </label>
          <select
            className="select select-bordered"
            value={current.view === undefined ? "" : current.view.toString()}
            onChange={(e) =>
              setForm({
                ...current,
                view:
                  e.target.value === ""
                    ? undefined
                    : (e.target.value as ViewOptions),
              })
            }
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
            onChange={(e) =>
              setForm({
                ...current,
                smoking:
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                      ? true
                      : false,
              })
            }
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
            onChange={(e) =>
              setForm({
                ...current,
                accessibility:
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                      ? true
                      : false,
              })
            }
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
            onChange={(e) =>
              setForm({
                ...current,
                balcony:
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                      ? true
                      : false,
              })
            }
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
            onChange={(e) =>
              setForm({
                ...current,
                pets:
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true"
                      ? true
                      : false,
              })
            }
          >
            <option value="">{t("roomres.nofilter")}</option>
            <option value={"true"}>{t("yes")}</option>
            <option value={"false"}>{t("no")}</option>
          </select>
        </div>
      </div>

      <div className="card-actions justify-end mt-16">
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {!isPending && t("roomres.save")}
        </button>
      </div>
    </form>
  );
};

export default RoomResComp;
