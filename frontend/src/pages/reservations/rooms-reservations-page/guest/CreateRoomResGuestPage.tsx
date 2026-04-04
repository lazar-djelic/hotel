import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import type { SimpleRoomResCreateStruct } from "../../../api/structs/RoomReservationStruct";
import { createEmptyRoomResGuest } from "../../../api/roomReservations/room-reservation-detail/createEmptyRoomReservation";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema";
import toast from "react-hot-toast";
import { useCreateRoomResGuest } from "../../../api/roomReservations/room-reservation-detail/useCreateRoomResGuest";
import { ArrowLeftIcon } from "lucide-react";
import DoubleCalendar from "../../DoubleCalendar";
import RoomResComp from "./RoomResCompGuest";
import { ROUTES } from "../../../../config/routes";

const CreateRoomResGuestPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const { user } = useAuth();

  const [form, setForm] = useState<SimpleRoomResCreateStruct>(() =>
    createEmptyRoomResGuest(),
  );

  const toUtcStartOfDay = (date: Date) =>
    new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  const toUtcEndOfDay = (date: Date) =>
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

  useEffect(() => {
    setForm(createEmptyRoomResGuest());
  }, [user]);

  useEffect(() => {
    if (user && !user.guest) {
      toast.error(t("toast.infofirst"));
      navigate(ROUTES.GUEST.PROFILE);
    }
  }, [user, navigate]);

  const { mutate: createRoomReservation, isPending: isPendingRoomRes } =
    useCreateRoomResGuest(navigate);

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

    const parsed = roomReservationSimpleSchema.safeParse({
      guest: user.guest._id,
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
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <Link to={ROUTES.GUEST.PROFILE} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            {t("back")}
          </Link>
        </div>

        {isPendingRoomRes && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="order-2 md:order-1 lg:order-1">
              <div className="card bg-base-100">
                <div className="card-body">
                  <RoomResComp
                    current={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    isPending={isPendingRoomRes}
                  />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 lg:order-2 justify-self-end">
              <DoubleCalendar
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default CreateRoomResGuestPage;
