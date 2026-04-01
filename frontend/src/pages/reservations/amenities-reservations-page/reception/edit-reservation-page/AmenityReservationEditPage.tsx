import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { amenityReservationSimpleSchema } from "../../../../../schemas/amenityReservation.response.schema";
import { useAmenityReservation } from "../../../../api/amenityReservations/amenity-reservation-detail/useAmenityReservation";
import { useEditAmenityReservation } from "../../../../api/amenityReservations/amenity-reservation-detail/useEditAmenityReservation";
import type { SimpleAmenityReservationStruct } from "../../../../api/structs/AmenityReservation";
import { useDeleteAmenityReservation } from "../../../../api/amenityReservations/amenity-reservation-detail/useDeleteAmenityReservation";
import NumberInputComp from "../../../../../components/NumberInputComp";
import SelectComp from "../../../../../components/SelectComp";
import { AM_RES_STATUS, type AmResStatus } from "../../../../../config/enums";
import DateAndTimeComp from "../../../../../components/DateAndTimeComp";
import { ROUTES } from "../../../../../config/routes";

const AmenityReservationEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const statusOptions = Object.values(AM_RES_STATUS);

  const { id } = useParams<{ id: string }>();
  const { amenityReservation, loading } = useAmenityReservation(id!);
  const [form, setForm] = useState<SimpleAmenityReservationStruct | null>(null);

  const { saveAmenityReservation: editAmenityReservation, saving: isPendingE } =
    useEditAmenityReservation(navigate);
  const { deleteAmenityReservation } = useDeleteAmenityReservation(navigate);

  useEffect(() => {
    if (amenityReservation) {
      const simpleForm: SimpleAmenityReservationStruct = {
        amenity:
          typeof amenityReservation.amenity === "string"
            ? amenityReservation.amenity
            : (amenityReservation.amenity as any)._id,
        user: amenityReservation.user
          ? typeof amenityReservation.user === "string"
            ? amenityReservation.user
            : (amenityReservation.user as any)._id
          : null,
        guest:
          typeof amenityReservation.guest === "string"
            ? amenityReservation.guest
            : (amenityReservation.guest as any)._id,
        startTime: amenityReservation.startTime,
        endTime: amenityReservation.endTime,
        numberOfPeople: amenityReservation.numberOfPeople,
        status: amenityReservation.status,
      };
      setForm(simpleForm);
    }
  }, [amenityReservation._id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;
    const parsed = amenityReservationSimpleSchema.safeParse({
      amenity: form.amenity,
      user: form.user,
      guest: form.guest,
      startTime: form.startTime,
      endTime: form.endTime,
      numberOfPeople: form.numberOfPeople,
      status: form.status,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";

      toast.error(firstError);
      return;
    }

    editAmenityReservation({ id: id!, amenityReservation: parsed.data });
  };

  const current = form;

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
                to={ROUTES.RECEPTION.AM_RES_S}
                className="btn btn-ghost mb-6"
              >
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>

              <button
                className="btn btn-error btn-outline"
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    deleteAmenityReservation(id!);
                  }
                }}
              >
                <Trash2Icon className="size-5" />
                {t("amenityRes.delete")}
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  {t("amenityRes.resDetails")}
                </h2>

                <form onSubmit={handleSubmit}>
                  <NumberInputComp
                    labelText={t("amenityRes.numOfPeople")}
                    iValue={current.numberOfPeople}
                    onChangeFn={(value) =>
                      setForm({ ...current, numberOfPeople: value })
                    }
                  />

                  <SelectComp
                    labelText={t("amenityRes.status")}
                    sValue={current.status}
                    onChangeFn={(value) =>
                      setForm({ ...current, status: value as AmResStatus })
                    }
                    options={statusOptions.map((option) => ({
                      value: option,
                      label: t(`amenityRes.statusEnum.${option}`),
                    }))}
                  />

                  <DateAndTimeComp
                    labelText={t("amenityRes.startTime")}
                    value={current.startTime.toISOString().slice(0, 16)}
                    onChangeFn={(value) =>
                      setForm({ ...current, startTime: new Date(value) })
                    }
                  />

                  <DateAndTimeComp
                    labelText={t("amenityRes.endTime")}
                    value={current.endTime.toISOString().slice(0, 16)}
                    onChangeFn={(value) =>
                      setForm({ ...current, endTime: new Date(value) })
                    }
                  />

                  <div className="card-actions justify-end mt-16">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isPendingE || loading}
                    >
                      {!isPendingE && !loading && t("amenityRes.save")}
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

export default AmenityReservationEditPage;
