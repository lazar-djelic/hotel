import { useTranslation } from "react-i18next";
import StringInputComp from "../../../../../components/StringInputComp";
import type { SimpleAmResCreateReceptionStruct } from "../../../../api/structs/AmenityReservation";

interface NewGuestInputsRecCompProps {
  isNew: boolean;
  current: SimpleAmResCreateReceptionStruct;
  setForm: (form: SimpleAmResCreateReceptionStruct) => void;
  guestFound: boolean;
  searchGuest: () => void;
  isSearching: boolean;
  setIsNew: (value: boolean) => void;
}

const NewGuestInputsRecComp = ({
  isNew,
  current,
  setForm,
  guestFound,
  searchGuest,
  isSearching,
  setIsNew,
}: NewGuestInputsRecCompProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t("amenityRes.guest")}</h3>

      <div className="flex items-center mb-8 mt-8">
        <input
          type="checkbox"
          className="checkbox"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
        />
        <span className="label-text ml-4">{t("amenityRes.newGuest")}</span>
      </div>

      <StringInputComp
        labelText={t("profile.fName")}
        iValue={current?.fName || ""}
        disable={!isNew && !guestFound}
        onChangeFn={(value) => setForm({ ...current!, fName: value })}
      />

      <StringInputComp
        labelText={t("profile.lName")}
        iValue={current?.lName || ""}
        disable={!isNew && !guestFound}
        onChangeFn={(value) => setForm({ ...current!, lName: value })}
      />

      <StringInputComp
        labelText={t("profile.phone")}
        iValue={current?.phone || ""}
        disable={!isNew && !guestFound}
        onChangeFn={(value) => setForm({ ...current!, phone: value })}
      />

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">{t("profile.email")}</span>
        </label>
        <input
          className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="text"
          value={current?.email || ""}
          onChange={(e) => setForm({ ...current!, email: e.target.value })}
        />
      </div>

      <StringInputComp
        labelText={t("profile.address")}
        iValue={current?.address || ""}
        disable={!isNew && !guestFound}
        onChangeFn={(value) => setForm({ ...current!, address: value })}
      />

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">{t("profile.personalID")}</span>
        </label>
        <input
          className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="text"
          value={current?.personalID || ""}
          onChange={(e) => setForm({ ...current!, personalID: e.target.value })}
        />
      </div>

      <label className="label">
        <span className="label-text">{t("profile.birthDate")}</span>
      </label>
      <input
        className="input input-bordered"
        type="date"
        disabled={!isNew && !guestFound}
        value={current?.birthDate.toISOString().split("T")[0]}
        onChange={(e) =>
          setForm({
            ...current,
            birthDate: new Date(e.target.value),
          })
        }
      />

      <StringInputComp
        labelText={t("profile.notes")}
        iValue={current?.notes || ""}
        disable={!isNew && !guestFound}
        onChangeFn={(value) => setForm({ ...current!, notes: value })}
      />

      {!isNew && (
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => searchGuest()}
          disabled={isSearching || (!current.email && !current.personalID)}
        >
          {isSearching ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            t("amenityRes.findGuest")
          )}
        </button>
      )}
    </div>
  );
};

export default NewGuestInputsRecComp;
