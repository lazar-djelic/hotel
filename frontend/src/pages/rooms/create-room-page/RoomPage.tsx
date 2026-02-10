import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useCreateRoom } from "../../api/rooms/create-room/useCreateRoom";
import { roomSimpleSchema } from "../../../schemas/room.response.schema";
import Navbar from "../../../components/Navbar";
import { useRoom } from "../../api/rooms/room-detail/useRoom";
import { useEditRoom } from "../../api/rooms/room-detail/useEditRoom";
import type { RoomStruct } from "../../api/rooms/RoomStruct";
import { useDeleteRoom } from "../../api/rooms/room-detail/useDeleteRoom";

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
  const { room, loading } = useRoom(isNew, id);
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
      <Navbar />

      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/rooms" className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>

              {!isNew && (
                <button
                  className="btn btn-error btn-outline"
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
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
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.floor")}
                      </span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="number"
                      value={current.floor}
                      min={0}
                      onChange={(e) => {
                        setForm({
                          ...current,
                          floor: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.roomnum")}
                      </span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="number"
                      value={current.roomnum}
                      min={0}
                      onChange={(e) => {
                        setForm({
                          ...current,
                          roomnum: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.type")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={current.type}
                      onChange={(e) =>
                        setForm({ ...current, type: e.target.value })
                      }
                    >
                      {typeOptions.map((option: string, index: number) => (
                        <option key={index} value={option}>
                          {t("create.room.typeoptions." + option)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.bednum")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={current.bednum}
                      onChange={(e) =>
                        setForm({ ...current, bednum: e.target.value })
                      }
                    >
                      {bedOptions.map((option: string, index: number) => (
                        <option key={index} value={option}>
                          {t("create.room.bedoptions." + option)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {t("create.room.smoking")}
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={current.smoking}
                        onChange={(e) =>
                          setForm({ ...current, smoking: e.target.checked })
                        }
                      />
                    </label>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {t("create.room.accessibility")}
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={current.accessibility}
                        onChange={(e) =>
                          setForm({
                            ...current,
                            accessibility: e.target.checked,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.view")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={current.view}
                      onChange={(e) =>
                        setForm({ ...current, view: e.target.value })
                      }
                    >
                      {viewOptions.map((option: string, index: number) => (
                        <option key={index} value={option}>
                          {t("create.room.viewoptions." + option)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {t("create.room.balcony")}
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={current.balcony}
                        onChange={(e) =>
                          setForm({ ...current, balcony: e.target.checked })
                        }
                      />
                    </label>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.status")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={current.status}
                      onChange={(e) =>
                        setForm({ ...current, status: e.target.value })
                      }
                    >
                      {statusOptions.map((option: string, index: number) => (
                        <option key={index} value={option}>
                          {t("create.room.statusoptions." + option)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.housekeeping")}
                      </span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={current.housekeeping}
                      onChange={(e) =>
                        setForm({ ...current, housekeeping: e.target.value })
                      }
                    >
                      {housekeepingOptions.map(
                        (option: string, index: number) => (
                          <option key={index} value={option}>
                            {t("create.room.housekeepingoptions." + option)}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        {t("create.room.lastcleaned")}
                      </span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="date"
                      value={current.lastcleaned.split("T")[0]}
                      onChange={(e) => {
                        setForm({
                          ...current,
                          lastcleaned: new Date(e.target.value)
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {t("create.room.linkedroom")}
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={current.linkedroom}
                        onChange={(e) =>
                          setForm({ ...current, linkedroom: e.target.checked })
                        }
                      />
                    </label>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {t("create.room.pets")}
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={current.pets}
                        onChange={(e) =>
                          setForm({ ...current, pets: e.target.checked })
                        }
                      />
                    </label>
                  </div>

                  <div className="card-actions justify-end mt-16">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isPending || isPendingE}
                    >
                      {isPending || isPendingE
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
