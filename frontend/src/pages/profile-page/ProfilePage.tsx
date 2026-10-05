import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import {
  formatDate,
  formatDateU,
  formatTime,
  formatTimeU,
} from "../../lib/utils";
import StringInputComp from "../../components/StringInputComp";
import SimpleDateInComp from "../../components/SimpleDateInComp";
import type { GuestStruct } from "../api/structs/GuestStruct";
import { guestSimpleSchema } from "../../schemas/guest.response.schema";
import toast from "react-hot-toast";
import { useCreateGuest } from "../api/guests/create-guest/useCreateGuest";
import { Link, useNavigate } from "react-router";
import { useEditGuest } from "../api/guests/edit-guest/useEditGuest";
import { useMyReview } from "../api/profile/useMyReview";
import { useMyAmRes } from "../api/profile/useMyAmRes";
import { useMyRoomRes } from "../api/profile/useMyRoomRes";
import { useMyStays } from "../api/profile/useMyStays";
import { ROUTES } from "../../config/routes";
import { CreditCard, FileText, X } from "lucide-react";
import { usePdfStay } from "../api/pdf/usePdfStay";
import { usePdfRoomres } from "../api/pdf/usePdfRoomres";
import { usePdfAmres } from "../api/pdf/usePdfAmres";
import { useCancelRoomres } from "../api/cancelReservations/useCancelRoomres";
import { useCancelAmres } from "../api/cancelReservations/useCancelAmres";
import { AM_RES_STATUS, RESERVATION_STATUS } from "../../config/enums";
import { useGetCancelPeriod } from "../api/cancelPeriod/useGetCancelPeriod";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { review, loadingRev } = useMyReview();
  const { amres, loadingAm } = useMyAmRes();
  const { roomres, loadingRoom } = useMyRoomRes();
  const { stays, loadingSt } = useMyStays();
  const { mutatePdfStay, isPendingPdfStay } = usePdfStay();
  const { mutatePdfRoomres, isPendingPdfRoomres } = usePdfRoomres();
  const { mutatePdfAmres, isPendingPdfAmres } = usePdfAmres();
  const { mutateCancelR } = useCancelRoomres();
  const { mutateCancelA } = useCancelAmres();
  const { cancelPeriod } = useGetCancelPeriod();

  const [form, setForm] = useState<GuestStruct | null>(null);
  const [selectedAmRes, setSelectedAmRes] = useState<string | null>(null);
  const [selectedRoomRes, setSelectedRoomRes] = useState<string | null>(null);
  const [selectedStay, setSelectedStay] = useState<string | null>(null);

  const { mutate: createGuest } = useCreateGuest(navigate, setForm);
  const { saveGuest: editGuest, saving: isPendingE } = useEditGuest(
    navigate,
    setForm,
  );

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const guest = user.guest;
  const current = form ?? guest;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    const parsed = guestSimpleSchema.safeParse({
      fName: form.fName,
      lName: form.lName,
      phone: form.phone,
      email: user.email,
      address: form.address,
      personalID: form.personalID,
      birthDate: form.birthDate,
      notes: "",
    });

    if (!parsed.success) {
      toast.error(t("toast.invalidinput"));
      return;
    }

    if (guest) editGuest({ id: guest._id, guest: parsed.data });
    else createGuest(parsed.data);
  };

  return (
    <div
      className={`mx-auto p-6 ${guest && !form ? "max-w-6xl" : "max-w-6xl"}`}
    >
      <div className="shadow-lg rounded-2xl p-6 border">
        <h1 className="text-2xl font-bold mb-6">{t("profile.title")}</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-black">
            {guest?.fName?.[0] || user.email?.[0]}
          </div>

          <div>
            <p className="font-semibold text-4xl">
              {guest?.fName} {guest?.lName}
            </p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {guest && !form && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4">
                {t("profile.personalInfo")}
              </h2>

              <div className="grid grid-cols-2 gap-y-2">
                <span className="text-gray-500">{t("profile.address")}</span>
                <span>{guest.address}</span>

                <span className="text-gray-500">{t("profile.birthDate")}</span>
                <span>{formatDate(guest.birthDate, i18n.language)}</span>

                <span className="text-gray-500">{t("profile.personalID")}</span>
                <span>{guest.personalID}</span>

                <span className="text-gray-500">{t("profile.phone")}</span>
                <span>{guest.phone}</span>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setForm({
                      _id: guest._id,
                      fName: guest.fName,
                      lName: guest.lName,
                      phone: guest.phone,
                      email: guest.email,
                      address: guest.address,
                      personalID: guest.personalID,
                      birthDate: guest.birthDate,
                      notes: guest.notes || "",
                      createdAt: guest.createdAt,
                      updatedAt: guest.updatedAt,
                    })
                  }
                >
                  {t("profile.edit")}
                </button>
              </div>

              {!loadingRev && review && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold mb-4">
                    {t("profile.review")}
                  </h2>
                  <div className="rating pointer-events-none">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <input
                        key={value}
                        type="radio"
                        name={`${review._id}`}
                        value={value}
                        className="mask mask-star-2 bg-orange-400"
                        checked={review.rating === value}
                        readOnly
                      />
                    ))}
                  </div>
                  <p className="mt-3">{review.opinion}</p>
                  <Link to={`${ROUTES.GUEST.REVIEW}/${review._id}`}>
                    <button className="btn btn-ghost btn-s text-info mt-4">
                      {t("profile.btneditrev")}
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              {amres && amres.length > 0 && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-4">
                    {t("profile.amress")}
                  </label>
                  <select
                    value={selectedAmRes || ""}
                    onChange={(e) => setSelectedAmRes(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">{t("profile.selectam")}</option>
                    {amres.map((am) => (
                      <option key={am._id} value={am._id}>
                        {am.amenity.name} -{" "}
                        {formatTime(am.startTime.toString())}
                      </option>
                    ))}
                  </select>
                  {selectedAmRes &&
                    amres.find((am) => am._id === selectedAmRes) && (
                      <div className="mt-4 p-4 rounded-lg">
                        {(() => {
                          const selected = amres.find(
                            (am) => am._id === selectedAmRes,
                          );
                          return (
                            <>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.amenity")}
                                </span>{" "}
                                {selected?.amenity.name}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.amenitytype")}
                                </span>{" "}
                                {t(`config.${selected?.amenity.type}`)}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.startt")}
                                </span>{" "}
                                {formatTimeU(selected?.startTime.toString())}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.endt")}
                                </span>{" "}
                                {formatTimeU(selected?.endTime.toString())}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.numpeop")}
                                </span>{" "}
                                {selected?.numberOfPeople}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.status")}
                                </span>{" "}
                                {t(`amenityRes.statusEnum.${selected?.status}`)}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.paid")}
                                </span>{" "}
                                {selected?.paid ? t("yes") : t("no")}
                              </p>
                              {selected?.refunded && (
                                <p>
                                  <span className="font-semibold">
                                    {t("profile.refunded")}
                                  </span>{" "}
                                  {selected?.refunded ? t("yes") : t("no")}
                                </p>
                              )}
                              {selected?.status !== AM_RES_STATUS.cancelled && (
                                <>
                                  {!selected?.paid && (
                                    <button
                                      onClick={() => {
                                        navigate(ROUTES.PAYMENT.CHECKOUT, {
                                          state: { amres: selected?._id },
                                        });
                                      }}
                                      className="btn btn-outline text-lg justify-end mt-2"
                                    >
                                      <CreditCard className="size-8" />
                                      {t("pay")}
                                    </button>
                                  )}
                                  {selected?.paid && (
                                    <button
                                      onClick={() => {
                                        mutatePdfAmres(selected._id);
                                      }}
                                      className="btn btn-outline text-lg justify-end mt-2"
                                    >
                                      <FileText className="size-8" />
                                      {t("pdf")}
                                    </button>
                                  )}

                                  {(() => {
                                    const startTime = selected?.startTime
                                      ? new Date(selected.startTime)
                                      : new Date();
                                    const cancelDeadlineMs =
                                      (cancelPeriod?.hours ?? 0) *
                                      60 *
                                      60 *
                                      1000;
                                    const canCancel =
                                      new Date().getTime() <=
                                      startTime.getTime() - cancelDeadlineMs;
                                    return canCancel ? (
                                      <button
                                        onClick={() => {
                                          if (selected)
                                            mutateCancelA({ id: selected._id });
                                        }}
                                        className="btn btn-outline text-lg justify-end mt-2"
                                      >
                                        <X className="size-8" />
                                        {t("cancelres")}
                                      </button>
                                    ) : null;
                                  })()}
                                </>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}
                </div>
              )}

              {roomres && roomres.length > 0 && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-4">
                    {t("profile.roomress")}
                  </label>
                  <select
                    value={selectedRoomRes || ""}
                    onChange={(e) => setSelectedRoomRes(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">{t("profile.selectroom")}</option>
                    {roomres.map((roomres) => (
                      <option key={roomres._id} value={roomres._id}>
                        {roomres.assignedRoom?.roomnum} -{" "}
                        {formatDate(
                          roomres.startDate.toString(),
                          i18n.language,
                        )}
                      </option>
                    ))}
                  </select>
                  {selectedRoomRes &&
                    roomres.find(
                      (roomres) => roomres._id === selectedRoomRes,
                    ) && (
                      <div className="mt-4 p-4 rounded-lg">
                        {(() => {
                          const selected = roomres.find(
                            (roomres) => roomres._id === selectedRoomRes,
                          );
                          return (
                            <>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.roomnum")}
                                </span>{" "}
                                {selected?.assignedRoom?.roomnum}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.startd")}
                                </span>{" "}
                                {formatDateU(
                                  selected?.startDate.toString(),
                                  i18n.language,
                                )}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.endd")}
                                </span>{" "}
                                {formatDateU(
                                  selected?.endDate.toString(),
                                  i18n.language,
                                )}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.adults")}
                                </span>{" "}
                                {selected?.adults}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.children")}
                                </span>{" "}
                                {selected?.children}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.resstatus")}
                                </span>{" "}
                                {t(`roomres.statusenum.${selected?.resStatus}`)}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.paid")}
                                </span>{" "}
                                {selected?.paid ? t("yes") : t("no")}
                              </p>
                              {selected?.refunded && (
                                <p>
                                  <span className="font-semibold">
                                    {t("profile.refunded")}
                                  </span>{" "}
                                  {selected?.refunded ? t("yes") : t("no")}
                                </p>
                              )}
                              {!selected?.paid && !selected?.refunded && (
                                <button
                                  onClick={() => {
                                    navigate(ROUTES.PAYMENT.CHECKOUT, {
                                      state: { roomres: selected?._id },
                                    });
                                  }}
                                  className="btn btn-outline text-lg justify-end mt-2"
                                >
                                  <CreditCard className="size-8" />
                                  {t("pay")}
                                </button>
                              )}
                              {selected?.paid && !selected?.refunded && (
                                <button
                                  onClick={() => {
                                    mutatePdfRoomres(selected._id);
                                  }}
                                  className="btn btn-outline text-lg justify-end mt-2"
                                >
                                  <FileText className="size-8" />
                                  {t("pdf")}
                                </button>
                              )}

                              {(() => {
                                const startDate = selected?.startDate
                                  ? new Date(selected.startDate)
                                  : new Date();
                                const cancelDeadlineMs =
                                  (cancelPeriod?.hours ?? 0) * 60 * 60 * 1000;
                                const canCancel =
                                  new Date().getTime() <=
                                  startDate.getTime() - cancelDeadlineMs;
                                return selected?.resStatus !==
                                  RESERVATION_STATUS.cancelled && canCancel ? (
                                  <button
                                    onClick={() => {
                                      if (selected)
                                        mutateCancelR({ id: selected._id });
                                    }}
                                    className="btn btn-outline text-lg justify-end mt-2"
                                  >
                                    <X className="size-8" />
                                    {t("cancelres")}
                                  </button>
                                ) : null;
                              })()}
                            </>
                          );
                        })()}
                      </div>
                    )}
                </div>
              )}

              {stays && stays.length > 0 && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-4">
                    {t("profile.stays")}
                  </label>
                  <select
                    value={selectedStay || ""}
                    onChange={(e) => setSelectedStay(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">{t("profile.selectstay")}</option>
                    {stays.map((stay) => (
                      <option key={stay._id} value={stay._id}>
                        {stay.room.roomnum} -{" "}
                        {formatDate(stay.checkIn.toString(), i18n.language)}
                      </option>
                    ))}
                  </select>
                  {selectedStay &&
                    stays.find((stay) => stay._id === selectedStay) && (
                      <div className="mt-4 p-4 rounded-lg">
                        {(() => {
                          const selected = stays.find(
                            (stay) => stay._id === selectedStay,
                          );
                          return (
                            <>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.roomnum")}
                                </span>{" "}
                                {selected?.room.roomnum}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.checkin")}
                                </span>{" "}
                                {formatDateU(
                                  selected?.checkIn.toString(),
                                  i18n.language,
                                )}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.checkout")}
                                </span>{" "}
                                {formatDateU(
                                  selected?.checkOut?.toString(),
                                  i18n.language,
                                )}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.adults")}
                                </span>{" "}
                                {selected?.adults}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.children")}
                                </span>{" "}
                                {selected?.children}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.status")}
                                </span>{" "}
                                {t(`stays.stayenum.${selected?.stStatus}`)}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t("profile.paid")}
                                </span>{" "}
                                {selected?.paid ? t("yes") : t("no")}
                              </p>
                              {!selected?.paid && (
                                <button
                                  onClick={() => {
                                    navigate(ROUTES.PAYMENT.CHECKOUT, {
                                      state: { stay: selected?._id },
                                    });
                                  }}
                                  className="btn btn-outline text-lg justify-end mt-2"
                                >
                                  <CreditCard className="size-8" />
                                  {t("pay")}
                                </button>
                              )}
                              {selected?.paid && (
                                <button
                                  onClick={() => {
                                    mutatePdfStay(selected._id);
                                  }}
                                  className="btn btn-outline text-lg justify-end mt-2"
                                >
                                  <FileText className="size-8" />
                                  {t("pdf")}
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        )}

        {(!guest || form) && (
          <form onSubmit={handleSubmit} className="mt-10">
            <h2 className="text-lg font-semibold mb-4">
              {guest
                ? t("profile.editPersonalInfo")
                : t("profile.enterPersonalInfo")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <StringInputComp
                labelText={t("profile.fName")}
                iValue={current?.fName || ""}
                disable={false}
                onChangeFn={(value) => setForm({ ...current!, fName: value })}
              />

              <StringInputComp
                labelText={t("profile.lName")}
                iValue={current?.lName || ""}
                disable={false}
                onChangeFn={(value) => setForm({ ...current!, lName: value })}
              />

              <StringInputComp
                labelText={t("profile.phone")}
                iValue={current?.phone || ""}
                disable={false}
                onChangeFn={(value) => setForm({ ...current!, phone: value })}
              />

              {/* <StringInputComp
              labelText={t("profile.email")}
              iValue={current?.email || ""}
              onChangeFn={(value) => setForm({ ...current!, email: value })}
            /> */}

              <StringInputComp
                labelText={t("profile.address")}
                iValue={current?.address || ""}
                disable={false}
                onChangeFn={(value) => setForm({ ...current!, address: value })}
              />

              <StringInputComp
                labelText={t("profile.personalID")}
                iValue={current?.personalID || ""}
                disable={false}
                onChangeFn={(value) =>
                  setForm({ ...current!, personalID: value })
                }
              />

              <SimpleDateInComp
                labelText={t("profile.birthDate")}
                value={current?.birthDate || ""}
                onChangeFn={(value) =>
                  setForm({ ...current!, birthDate: value })
                }
              />

              {/* <StringInputComp
              labelText={t("profile.notes")}
              iValue={current?.notes || ""}
              onChangeFn={(value) => setForm({ ...current!, notes: value })}
            /> */}
            </div>

            <div className="flex justify-end gap-4 mt-10">
              {guest && form && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setForm(null)}
                >
                  {t("cancel")}
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {guest ? t("profile.save") : t("profile.create")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
