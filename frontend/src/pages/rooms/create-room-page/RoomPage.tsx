import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useCreateRoom } from "../../api/rooms/create-room/useCreateRoom";
import { roomSimpleSchema } from "../../../schemas/room.response.schema";
import { useRoom } from "../../api/rooms/room-detail/useRoom";
import { useEditRoom } from "../../api/rooms/room-detail/useEditRoom";
import type { RoomStruct } from "../../api/structs/RoomStruct";
import { useDeleteRoom } from "../../api/rooms/room-detail/useDeleteRoom";
import NumberInputComp from "../../../components/NumberInputComp";
import SelectComp from "../../../components/SelectComp";
import CheckboxComp from "../../../components/CheckboxComp";
import SimpleDateInComp from "../../../components/SimpleDateInComp";
import { CURRENCIES, type CurrType } from "../../../config/enums";
import { ROUTES } from "../../../config/routes";

const RoomPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const typeOptions = ["standard", "deluxe", "suite", "penthouse"];
  const bedOptions = ["single", "double", "twin"];
  const viewOptions = ["none", "sea", "city", "garden"];
  const statusOptions = ["available", "occupied", "reserved", "outofservice"];
  const housekeepingOptions = ["clean", "dirty", "inspected"];

  const { id } = useParams<{ id?: string }>();
  const isNew = !id;
  const [isDeleting, setIsDeleting] = useState(false);
  const { room, loading } = useRoom(isNew, id, !isDeleting);
  const [form, setForm] = useState<RoomStruct | null>(null);

  const { mutate: createRoom, isPending } = useCreateRoom(navigate);
  const { saveRoom: editRoom, saving: isPendingE } = useEditRoom(navigate);
  const { deleteRoom } = useDeleteRoom(navigate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;
    const parsed = roomSimpleSchema.safeParse({
      floor: form.floor,
      roomnum: form.roomnum,
      type: form.type,
      bednum: form.bednum,
      smoking: form.smoking,
      accessibility: form.accessibility,
      view: form.view,
      balcony: form.balcony,
      status: form.status,
      housekeeping: form.housekeeping,
      lastcleaned: form.lastcleaned,
      linkedroom: form.linkedroom,
      pets: form.pets,
      currentStay: form.currentStay === null ? null : form.currentStay?._id,
      rate: form.rate,
      currency: form.currency,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";

      toast.error(firstError);
      return;
    }

    if (isNew) createRoom(parsed.data);
    else editRoom({ id: id, room: parsed.data });
  };

  const current = form ?? room;

  return (
    <>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to={ROUTES.ADMIN.ROOMS} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>

              {!isNew && (
                <button
                  className="btn btn-error btn-outline"
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      setIsDeleting(true);
                      deleteRoom(id!);
                    }
                  }}
                >
                  <Trash2Icon className="size-5" />
                  {t("edit.room.delete")}
                </button>
              )}
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  {isNew ? t("create.room.title") : t("edit.room.title")}
                </h2>

                <form onSubmit={handleSubmit}>
                  <NumberInputComp
                    labelText={t("create.room.floor")}
                    iValue={current.floor}
                    onChangeFn={(value) =>
                      setForm({ ...current, floor: value })
                    }
                  />

                  <NumberInputComp
                    labelText={t("create.room.roomnum")}
                    iValue={current.roomnum}
                    onChangeFn={(value) =>
                      setForm({ ...current, roomnum: value })
                    }
                  />

                  <SelectComp
                    labelText={t("create.room.type")}
                    sValue={current.type}
                    onChangeFn={(value) => setForm({ ...current, type: value })}
                    options={typeOptions.map((option) => ({
                      value: option,
                      label: t(`create.room.typeoptions.${option}`),
                    }))}
                  />

                  <SelectComp
                    labelText={t("create.room.bednum")}
                    sValue={current.bednum}
                    onChangeFn={(value) =>
                      setForm({ ...current, bednum: value })
                    }
                    options={bedOptions.map((option) => ({
                      value: option,
                      label: t(`create.room.bedoptions.${option}`),
                    }))}
                  />

                  <CheckboxComp
                    labelText={t("create.room.smoking")}
                    isCheck={current.smoking}
                    onChangeFn={(checked) =>
                      setForm({ ...current, smoking: checked })
                    }
                  />

                  <CheckboxComp
                    labelText={t("create.room.accessibility")}
                    isCheck={current.accessibility}
                    onChangeFn={(checked) =>
                      setForm({ ...current, accessibility: checked })
                    }
                  />

                  <SelectComp
                    labelText={t("create.room.view")}
                    sValue={current.view}
                    onChangeFn={(value) => setForm({ ...current, view: value })}
                    options={viewOptions.map((option) => ({
                      value: option,
                      label: t(`create.room.viewoptions.${option}`),
                    }))}
                  />

                  <CheckboxComp
                    labelText={t("create.room.balcony")}
                    isCheck={current.balcony}
                    onChangeFn={(checked) =>
                      setForm({ ...current, balcony: checked })
                    }
                  />

                  <SelectComp
                    labelText={t("create.room.status")}
                    sValue={current.status}
                    onChangeFn={(value) =>
                      setForm({ ...current, status: value })
                    }
                    options={statusOptions.map((option) => ({
                      value: option,
                      label: t(`create.room.statusoptions.${option}`),
                    }))}
                  />

                  <SelectComp
                    labelText={t("create.room.housekeeping")}
                    sValue={current.housekeeping}
                    onChangeFn={(value) =>
                      setForm({ ...current, housekeeping: value })
                    }
                    options={housekeepingOptions.map((option) => ({
                      value: option,
                      label: t(`create.room.housekeepingoptions.${option}`),
                    }))}
                  />

                  <SimpleDateInComp
                    labelText={t("create.room.lastcleaned")}
                    value={current.lastcleaned.toISOString()}
                    onChangeFn={(value) =>
                      setForm({ ...current, lastcleaned: new Date(value) })
                    }
                  />

                  <CheckboxComp
                    labelText={t("create.room.linkedroom")}
                    isCheck={current.linkedroom}
                    onChangeFn={(checked) =>
                      setForm({ ...current, linkedroom: checked })
                    }
                  />

                  <CheckboxComp
                    labelText={t("create.room.pets")}
                    isCheck={current.pets}
                    onChangeFn={(checked) =>
                      setForm({ ...current, pets: checked })
                    }
                  />

                  <NumberInputComp
                    labelText={t("create.room.rate")}
                    iValue={current.rate}
                    onChangeFn={(value) => setForm({ ...current, rate: value })}
                  />

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.currency")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={current.currency}
                      onChange={(e) =>
                        setForm({
                          ...current,
                          currency: e.target.value as CurrType,
                        })
                      }
                    >
                      {Object.values(CURRENCIES).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="card-actions justify-end mt-16">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isPending || isPendingE || loading}
                    >
                      {isPending || isPendingE || loading
                        ? isNew
                          ? t("create.room.loadbtn")
                          : t("edit.room.loadbtn")
                        : isNew
                          ? t("create.room.button")
                          : t("edit.room.button")}
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

export default RoomPage;
