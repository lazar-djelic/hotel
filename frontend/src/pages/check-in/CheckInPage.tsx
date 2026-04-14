import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import type { SimpleStayCreateStruct } from "../api/structs/StayStruct";
import { createEmptyStay } from "../api/stays/check-in/createEmptyStay";
import { useFindGuestStay } from "../api/stays/check-in/useFindGuesStay";
import toast from "react-hot-toast";
import { staySimpleSchema } from "../../schemas/stay.response.schema";
import DoubleCalendar from "../reservations/DoubleCalendar";
import { useRoomReservations } from "../api/roomReservations/all-roomReservations/useRoomReservations";
import { formatDate } from "../../lib/utils";
import i18n from "../../i18n";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import NewGuestInputsRecComp from "./NewGuestInputsRecComp";
import PreferencesComp from "./PreferencesComp";
import { useCreateStay } from "../api/stays/check-in/useCreateStay";
import { RESERVATION_STATUS } from "../../config/enums";
import type { GuestStruct } from "../api/structs/GuestStruct";
import { checkData } from "./checkData";
import { useCreateGuestCheckIn } from "./useCreateGuestCheckIn";
import { useUpdateGuestCheckIn } from "./useUpdateGuestCheckIn";

const CheckInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isNewG, setIsNewG] = useState<boolean>(true);
  const [hasRes, setHasRes] = useState<boolean>(false);
  const [guestFound, setGuestFound] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(1);
  const [guest, setGuest] = useState<GuestStruct | undefined>(undefined);

  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [, setSearchParams] = useSearchParams();
  const { reservations, isLoading } = useRoomReservations(
    dateRange[0],
    setSearchParams,
  );

  const [form, setForm] = useState<SimpleStayCreateStruct>(() =>
    createEmptyStay(),
  );

  const handleToggleNewGuest = (value: boolean) => {
    setIsNewG(value);
    if (value) {
      setForm({
        ...form,
        fName: "",
        lName: "",
        phone: "",
        email: "",
        address: "",
        personalID: "",
        birthDate: new Date(),
        notes: "",
        guest: undefined,
      });
      setGuestFound(false);
    }
  };

  const { mutate: createStay, isPending } = useCreateStay(navigate);

  const { searchGuest, isSearching } = useFindGuestStay({
    form,
    setForm,
    setGuestFound,
    setGuest,
    t,
  });

  const { createGuest, creating: creatingGuest } = useCreateGuestCheckIn({
    form,
    setForm,
    setGuestFound,
    setGuest,
    t,
  });
  const { saveGuest, saving: savingGuest } = useUpdateGuestCheckIn(
    form.guest || "",
    {
      fName: form.fName,
      lName: form.lName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      personalID: form.personalID,
      birthDate: form.birthDate,
      notes: form.notes,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    const parsed = staySimpleSchema.safeParse({
      guest: form.guest,
      reservation: hasRes ? form.roomReservation : null,
      room: form.assignedRoom?._id,
      checkIn: form.startDate,
      checkOut: form.endDate,
      adults: form.adults,
      children: form.children,
      notes: form.notesStay,
      breakfast: form.breakfast,
    });

    if (!parsed.success) {
      toast.error(t("toast.invalidinput"));
      return;
    }

    createStay({
      stay: parsed.data,
    });
  };

  return (
    <div>
      {screen == 1 && (
        <div className="max-w-7xl mx-auto p-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="order-1 md:order-1 lg:order-1">
              {!isLoading && reservations.length === 0 && (
                <div className="text-center text-primary py-10">
                  {t("nores")}
                </div>
              )}

              {reservations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation._id}
                      className={`card-body border-solid ${form.roomReservation === reservation._id ? "border-4 border-success" : "border"}`}
                      onClick={() => {
                        if (
                          reservation.resStatus ===
                          RESERVATION_STATUS.checked_in
                        )
                          return;

                        setForm({
                          ...form,
                          roomReservation: reservation._id,
                          startDate: reservation.startDate,
                          endDate: reservation.endDate,
                          assignedRoom: reservation.assignedRoom,
                          guest: reservation.guest._id,
                          fName: reservation.guest.fName,
                          lName: reservation.guest.lName,
                          phone: reservation.guest.phone,
                          email: reservation.guest.email,
                          address: reservation.guest.address,
                          personalID: reservation.guest.personalID,
                          birthDate: reservation.guest.birthDate,
                          notes: reservation.guest.notes,
                          adults: reservation.adults,
                          children: reservation.children,
                        });
                        setHasRes(true);
                        setIsNewG(false);
                        setGuestFound(true);
                        setGuest(reservation.guest);
                      }}
                    >
                      {reservation.resStatus ===
                      RESERVATION_STATUS.checked_in ? (
                        <>
                          <h4 className="card-title text-base-content">
                            {reservation.guest.fName} {reservation.guest.lName}
                          </h4>
                          <p className="text-green-600 font-semibold">
                            {t("checkin.checkedin")}
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="card-title text-base-content">
                            {reservation.guest.fName} {reservation.guest.lName}
                          </h4>
                          <p className="text-base-content/70">
                            {t("roomres.startd")}
                            {formatDate(
                              reservation.startDate.toString(),
                              i18n.language,
                            )}
                          </p>
                          <p className="text-base-content/70">
                            {t("roomres.endd")}
                            {formatDate(
                              reservation.endDate.toString(),
                              i18n.language,
                            )}
                          </p>
                          <p className="text-base-content/70">
                            {t("roomres.adults")}
                            {reservation.adults}
                          </p>
                          <p className="text-base-content/70">
                            {t("roomres.children")}
                            {reservation.children}
                          </p>
                          <p className="text-base-content/70">
                            {t("roomres.assignedroom")}
                            {reservation.assignedRoom.roomnum}
                          </p>
                          <p className="text-base-content/70">
                            {t("roomres.status")}
                            {t(`roomres.statusenum.${reservation.resStatus}`)}
                          </p>
                          <p className="text-base-content/70">
                            {t("roomres.paid")}
                            {reservation.paid ? t("yes") : t("no")}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="order-2 md:order-2 lg:order-2 justify-self-end">
              <DoubleCalendar
                dateRange={dateRange}
                setDateRange={setDateRange}
              />

              <div className="flex justify-end mx-auto mt-4">
                <button
                  type="button"
                  className="btn btn-secondary mt-4"
                  onClick={() => {
                    setScreen(2);
                  }}
                >
                  {t("nextpage")}
                  <ArrowRightIcon className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen == 2 && (
        <div className="max-w-7xl mx-auto p-4 mt-8">
          <div>
            <NewGuestInputsRecComp
              isNew={isNewG}
              current={form}
              setForm={setForm}
              guestFound={guestFound}
              searchGuest={searchGuest}
              isSearching={isSearching}
              setIsNew={handleToggleNewGuest}
            />
          </div>

          <div className="flex justify-between mx-auto mt-4">
            <div className="flex justify-start">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={() => {
                  setScreen(1);
                }}
              >
                <ArrowLeftIcon className="size-5" />
                {t("previouspage")}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={() => {
                  if (!form) return;

                  const tmp = checkData(form, guest, isNewG, setScreen, t);

                  if (!tmp) {
                    return;
                  }

                  if (tmp.action === "create") {
                    const guestData = {
                      ...tmp.guest,
                      notes: tmp.guest.notes || "",
                    };
                    createGuest(guestData);
                    setScreen(3);
                    return;
                  }

                  if (tmp.action === "update") {
                    saveGuest();
                    setScreen(3);
                    return;
                  }
                }}
              >
                {t("nextpage")}
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {screen == 3 && (
        <div className="max-w-7xl mx-auto p-4 mt-8">
          <div>
            <PreferencesComp
              current={form}
              setForm={setForm}
              setScreen={setScreen}
              handleSubmit={handleSubmit}
              isPending={isPending}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInPage;
