import { useTranslation } from "react-i18next";
import type { SimpleAmResCreateReceptionStruct } from "../../../../api/structs/AmenityReservation";
import type { AmenitySlotStruct } from "../../../../api/structs/AmenitySlot";
import type { AmenityStruct } from "../../../../api/structs/AmenityStruct";
import CheckboxComp from "../../../../../components/CheckboxComp";

interface AmResCompProps {
  amenities: AmenityStruct[];
  selectedOption: string | null;
  setSelectedOption: (value: string) => void;
  current: SimpleAmResCreateReceptionStruct;
  setForm: (form: SimpleAmResCreateReceptionStruct) => void;
  loading: boolean;
  slots: AmenitySlotStruct[];
  selectedSlotIndex: number | null;
  setSelectedSlotIndex: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

const AmResComp = ({
  amenities,
  selectedOption,
  setSelectedOption,
  current,
  setForm,
  loading,
  slots,
  selectedSlotIndex,
  setSelectedSlotIndex,
  handleSubmit,
  isPending,
}: AmResCompProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("amenityRes.amenity")}</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedOption ?? ""}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {amenities
              .filter((amenity) => amenity.requiresReservation)
              .map((amenity) => (
                <option key={amenity._id} value={amenity._id}>
                  {amenity.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("amenityRes.date")}</span>
          </label>
          <input
            className="input input-bordered"
            type="date"
            value={current.date.toISOString().split("T")[0]}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              const startTimeHours = current.startTime.getUTCHours();
              const startTimeMinutes = current.startTime.getUTCMinutes();
              const endTimeHours = current.endTime.getUTCHours();
              const endTimeMinutes = current.endTime.getUTCMinutes();

              const newStartTime = new Date(
                Date.UTC(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  startTimeHours,
                  startTimeMinutes,
                  0,
                ),
              );
              const newEndTime = new Date(
                Date.UTC(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  endTimeHours,
                  endTimeMinutes,
                  0,
                ),
              );

              setForm({
                ...current,
                date: newDate,
                startTime: newStartTime,
                endTime: newEndTime,
              });
            }}
          />
        </div>
      </div>

      <div className="mb-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {t("amenityRes.availableSlots")}
        </h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : slots && slots.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead>
                <tr className="bg-base-300">
                  <th>{t("amenityRes.startTime")}</th>
                  <th>{t("amenityRes.endTime")}</th>
                  <th>{t("amenityRes.availability")}</th>
                  <th>{t("amenityRes.remainingCapacity")}</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, index) => {
                  const isAvailable =
                    slot.available && slot.remainingCapacity > 0;
                  const startTimeFormatted = new Date(slot.startTime)
                    .toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "UTC",
                    })
                    .replace("24:", "00:");
                  const endTimeFormatted = new Date(slot.endTime)
                    .toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "UTC",
                    })
                    .replace("24:", "00:");
                  const isSelected = selectedSlotIndex === index;

                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        if (!slot.available) return;
                        console.log("click");

                        const slotStartTime = new Date(slot.startTime);
                        const slotEndTime = new Date(slot.endTime);

                        // Create UTC dates with the selected date but slot times
                        const newStartTime = new Date(
                          Date.UTC(
                            current.date.getUTCFullYear(),
                            current.date.getUTCMonth(),
                            current.date.getUTCDate(),
                            slotStartTime.getUTCHours(),
                            slotStartTime.getUTCMinutes(),
                            0,
                          ),
                        );
                        const newEndTime = new Date(
                          Date.UTC(
                            current.date.getUTCFullYear(),
                            current.date.getUTCMonth(),
                            current.date.getUTCDate(),
                            slotEndTime.getUTCHours(),
                            slotEndTime.getUTCMinutes(),
                            0,
                          ),
                        );

                        setSelectedSlotIndex(index);
                        setForm({
                          ...current,
                          startTime: newStartTime,
                          endTime: newEndTime,
                        });
                      }}
                      className={`cursor-pointer transition-all border-l-4 ${
                        isAvailable ? "border-l-green-500" : "border-l-red-500"
                      } ${
                        isSelected
                          ? isAvailable
                            ? "bg-[rgba(34,197,94,0.25)]"
                            : "bg-[rgba(239,68,68,0.25)]"
                          : isAvailable
                            ? "bg-[rgba(34,197,94,0.08)] hover:bg-[rgba(34,197,94,0.15)]"
                            : "bg-[rgba(239,68,68,0.08)] hover:bg-[rgba(239,68,68,0.15)]"
                      }`}
                    >
                      <td className="font-medium">{startTimeFormatted}</td>
                      <td>{endTimeFormatted}</td>
                      <td>
                        <span className="font-medium">
                          {slot.available ? t("yes") : t("no")}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`font-semibold ${
                            slot.remainingCapacity > 0
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {slot.remainingCapacity}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info">
            <span>{t("amenityRes.noSlotsAvailable")}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("amenityRes.numOfPeople")}</span>
          </label>
          <input
            className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={current.numberOfPeople}
            min={0}
            onChange={(e) =>
              setForm({
                ...current,
                numberOfPeople: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="mt-4">
        <CheckboxComp
          labelText={t("checkin.payNow")}
          isCheck={current.payNow}
          onChangeFn={(checked) =>
            setForm({
              ...current,
              payNow: checked,
            })
          }
        />
      </div>

      <div className="card-actions justify-end mt-16">
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {!isPending && t("amenityRes.save")}
        </button>
      </div>
    </form>
  );
};

export default AmResComp;
