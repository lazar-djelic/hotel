import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useAmenities } from "../../../api/amenities/all-amenities/useAmenities";
import { useAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import type { SimpleAmResCreateStruct } from "../../../api/structs/AmenityReservation";
import { createEmptyAmResGuest } from "../../../api/amenityReservations/amenity-reservation-detail/createEmptyAmenityReservation";
import { useAmenitySlots } from "../../../api/amenities/amenity-slots/useAmenitySlots";
import { amenityReservationSimpleSchema } from "../../../../schemas/amenityReservation.response.schema";
import { RESERVATION_STATUS } from "../../../../config/enums";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import { useCreateAmResGuest } from "../../../api/amenityReservations/amenity-reservation-detail/useCreateAmResGuest";
import { ROUTES } from "../../../../config/routes";

const CreateAmenityResGuestPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { amenities } = useAmenities();
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null,
  );

  const [form, setForm] = useState<SimpleAmResCreateStruct>(() =>
    createEmptyAmResGuest(),
  );

  useEffect(() => {
    if (amenities.length > 0 && !selectedOption) {
      const firstReservableAmenity = amenities.find(
        (a) => a.requiresReservation,
      );
      if (firstReservableAmenity) {
        setSelectedOption(firstReservableAmenity._id);
      }
    }
  }, [amenities, selectedOption]);

  const { slots, loading } = useAmenitySlots(selectedOption, form.date);

  const { mutate: createAmenityReservation, isPending: isPendingAmenity } =
    useCreateAmResGuest(navigate);

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  useEffect(() => {
    if (user && !user.guest) {
      toast.error("You need to enter your information first.");
      navigate(ROUTES.GUEST.PROFILE);
    }
  }, [user, navigate]);

  const guest = user.guest;
  const current = form ?? guest;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    const parsed = amenityReservationSimpleSchema.safeParse({
      amenity: selectedOption,
      user: user._id,
      guest: user.guest._id,
      startTime: form.startTime,
      endTime: form.endTime,
      numberOfPeople: form.numberOfPeople,
      status: RESERVATION_STATUS.booked,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      toast.error(firstError);
      return;
    }

    createAmenityReservation({
      id: selectedOption,
      amenityReservation: parsed.data,
    });
  };

  return (
    <>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to={ROUTES.GUEST.PROFILE} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  {t("amenityRes.resDetails")}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          {t("amenityRes.amenity")}
                        </span>
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
                        <span className="label-text">
                          {t("amenityRes.date")}
                        </span>
                      </label>
                      <input
                        className="input input-bordered"
                        type="date"
                        value={current.date.toISOString().split("T")[0]}
                        onChange={(e) => {
                          const newDate = new Date(e.target.value);
                          const startTimeHours =
                            current.startTime.getUTCHours();
                          const startTimeMinutes =
                            current.startTime.getUTCMinutes();
                          const endTimeHours = current.endTime.getUTCHours();
                          const endTimeMinutes =
                            current.endTime.getUTCMinutes();

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
                              const startTimeFormatted = new Date(
                                slot.startTime,
                              )
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

                                    const slotStartTime = new Date(
                                      slot.startTime,
                                    );
                                    const slotEndTime = new Date(slot.endTime);

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
                                    isAvailable
                                      ? "border-l-green-500"
                                      : "border-l-red-500"
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
                                  <td className="font-medium">
                                    {startTimeFormatted}
                                  </td>
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
                        <span className="label-text">
                          {t("amenityRes.numOfPeople")}
                        </span>
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

                  <div className="card-actions justify-end mt-16">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isPendingAmenity}
                    >
                      {!isPendingAmenity && t("amenityRes.save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAmenityResGuestPage;
