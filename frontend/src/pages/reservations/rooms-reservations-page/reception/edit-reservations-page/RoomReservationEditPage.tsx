import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import type { RoomReservationStruct } from "../../../../api/structs/RoomReservationStruct";
import { useRoomReservation } from "../../../../api/roomReservations/room-reservation-detail/useRoomReservation";
import { useDeleteRoomReservation } from "../../../../api/roomReservations/room-reservation-detail/useDeleteRoomReservation";
import { updateRoomReservationSimpleSchema } from "../../../../../schemas/roomReservation.response.schema";
import { useEditRoomReservation } from "../../../../api/roomReservations/room-reservation-detail/useEditRoomReservation";
import NumberInputComp from "../../../../../components/NumberInputComp";
import SelectComp from "../../../../../components/SelectComp";
import {
  RESERVATION_STATUS,
  type ResStatus,
} from "../../../../../config/enums";
import { ROUTES } from "../../../../../config/routes";

const RoomReservationEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const statusOptions = Object.values(RESERVATION_STATUS);

  const { id } = useParams<{ id: string }>();
  const { roomReservation, loading } = useRoomReservation(id!);
  const [form, setForm] = useState<RoomReservationStruct | null>(null);

  const { saveRoomReservation: editRoomReservation, saving: isPendingE } =
    useEditRoomReservation(navigate);
  const { deleteRoomReservation } = useDeleteRoomReservation(navigate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;
    const parsed = updateRoomReservationSimpleSchema.safeParse({
      guest: form.guest._id,
      startDate: form.startDate,
      endDate: form.endDate,
      adults: form.adults,
      children: form.children,
      assignedRoom: form.assignedRoom._id,
      resStatus: form.resStatus,
    });

    if (!parsed.success) {
      toast.error(t("toast.invalidinput"));
      return;
    }

    editRoomReservation({ id: id!, roomReservation: parsed.data });
  };

  const current = form ?? roomReservation;

  if (loading || !current) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link
                to={ROUTES.RECEPTION.ROOM_RES_S}
                className="btn btn-ghost mb-6"
              >
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>

              <button
                className="btn btn-error btn-outline"
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    deleteRoomReservation(id!);
                  }
                }}
              >
                <Trash2Icon className="size-5" />
                {t("roomres.delete")}
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  {t("amenityRes.resDetails")}
                </h2>

                <form onSubmit={handleSubmit}>
                  <NumberInputComp
                    labelText={t("roomres.adults")}
                    iValue={current.adults}
                    onChangeFn={(value) =>
                      setForm({ ...current, adults: value })
                    }
                  />

                  <NumberInputComp
                    labelText={t("roomres.children")}
                    iValue={current.children}
                    onChangeFn={(value) =>
                      setForm({ ...current, children: value })
                    }
                  />

                  <SelectComp
                    labelText={t("roomres.status")}
                    sValue={current.resStatus}
                    onChangeFn={(value) =>
                      setForm({ ...current, resStatus: value as ResStatus })
                    }
                    options={statusOptions.map((option) => ({
                      value: option,
                      label: t(`roomres.statusenum.${option}`),
                    }))}
                  />

                  <div className="card-actions justify-end mt-16">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isPendingE || loading}
                    >
                      {!isPendingE && !loading && t("roomres.save")}
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

export default RoomReservationEditPage;
