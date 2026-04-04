import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { SimpleRoomResCreateReceptionStruct } from "../../../../api/structs/RoomReservationStruct";
import { createEmptyRoomReservation } from "../../../../api/roomReservations/room-reservation-detail/createEmptyRoomReservation";
import toast from "react-hot-toast";
import { useFindGuestRoomRes } from "./useFindGuestRoomRes";
import DoubleCalendar from "../../../DoubleCalendar";
import NewGuestInputsRecComp from "../../../rooms-reservations-page/reception/create-page/NewGuestInputsRecComp";
import {
  roomReservationSimpleSchema,
  userAndRoomResRecSimpleSchema,
} from "../../../../../schemas/roomReservation.response.schema";
import { useCreateRoomReservationRec } from "../../../../api/roomReservations/room-reservation-detail/useCreateRoomReservation";
import { useCreateGuestAndRoomResRec } from "../../../../api/roomReservations/room-reservation-detail/useCreateGuestAndRoomResRec";
import RoomResComp from "./RoomResComp";
import { ArrowRightIcon } from "lucide-react";
import { ROUTES } from "../../../../../config/routes";

export const toUtcStartOfDay = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

export const toUtcEndOfDay = (date: Date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999,
    ),
  );

const CreateRoomResRecPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const [isNew, setIsNew] = useState<boolean>(true);
  const [guestFound, setGuestFound] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(1);

  const [form, setForm] = useState<SimpleRoomResCreateReceptionStruct>(() =>
    createEmptyRoomReservation(),
  );

  useEffect(() => {
    setForm(createEmptyRoomReservation());
    setGuestFound(false);
  }, [isNew]);

  const { mutate: createRoomReservation, isPending } =
    useCreateRoomReservationRec(navigate);

  const { mutate: createGuestAndRoomReservation, isPending: isPendingGuest } =
    useCreateGuestAndRoomResRec(navigate);

  const isPendingG = isNew ? isPendingGuest : isPending;

  const { searchGuest, isSearching } = useFindGuestRoomRes({
    form,
    setForm,
    setGuestFound,
    setScreen,
    t,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    if (isNew) {
      const parsed = userAndRoomResRecSimpleSchema.safeParse({
        fName: form.fName,
        lName: form.lName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        personalID: form.personalID,
        birthDate: form.birthDate,
        notes: form.notes,
        roomType: form.roomType,
        bedNum: form.bedNum,
        startDate: toUtcStartOfDay(dateRange[0].startDate),
        endDate: toUtcEndOfDay(dateRange[0].endDate),
        adults: form.adults,
        children: form.children,
        smoking: form.smoking,
        accessibility: form.accessibility,
        view: form.view,
        balcony: form.balcony,
        pets: form.pets,
      });

      if (!parsed.success) {
        toast.error(t("toast.invalidinput"));
        return;
      }

      createGuestAndRoomReservation({
        roomReservation: parsed.data,
      });
    } else {
      const parsed = roomReservationSimpleSchema.safeParse({
        guest: form.guest,
        startDate: toUtcStartOfDay(dateRange[0].startDate),
        endDate: toUtcEndOfDay(dateRange[0].endDate),
        roomType: form.roomType,
        bedNum: form.bedNum,
        adults: form.adults,
        children: form.children,
        smoking: form.smoking,
        accessibility: form.accessibility,
        view: form.view,
        balcony: form.balcony,
        pets: form.pets,
      });

      if (!parsed.success) {
        toast.error(t("toast.invalidinput"));
        return;
      }

      createRoomReservation({
        roomReservation: parsed.data,
      });
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-8">
        {/* <div className="flex items-center justify-between mb-6">
          <Link
            to={ROUTES.RECEPTION.ROOM_RES_S}
            className="btn btn-ghost mb-6"
          >
            <ArrowLeftIcon className="size-5" />
            {t("back")}
          </Link>
        </div> */}

        {isPendingG && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        {(screen === 1 || screen === 2) && (
          <div>
            <div>
              <NewGuestInputsRecComp
                isNew={isNew}
                current={form}
                setForm={setForm}
                setScreen={setScreen}
                guestFound={guestFound}
                searchGuest={searchGuest}
                isSearching={isSearching}
                setIsNew={setIsNew}
              />
            </div>

            <div className="flex justify-end mx-auto mt-4">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={() => {
                  setScreen(3);
                }}
              >
                {t("nextpage")}
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </div>
        )}

        {screen === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="order-2 md:order-1 lg:order-1">
              <div className="">
                <div className="card bg-base-100">
                  <div className="card-body">
                    <RoomResComp
                      current={form}
                      setForm={setForm}
                      setScreen={setScreen}
                      handleSubmit={handleSubmit}
                      isPending={isPendingG}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 lg:order-2 justify-self-end mt-8">
              <DoubleCalendar
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoomResRecPage;
