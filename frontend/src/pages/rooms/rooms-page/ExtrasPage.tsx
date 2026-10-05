import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useGetExtras } from "../../api/extras/useGetExtras";
import { useGetExtra } from "../../api/extras/useGetExtra";
import { useCreateExtra } from "../../api/extras/useCreateExtra";
import { useUpdateExtra } from "../../api/extras/useUpdateExtra";
import { useDeleteExtra } from "../../api/extras/useDeleteExtra";
import StringInputComp from "../../../components/StringInputComp";
import NumberInputComp from "../../../components/NumberInputComp";
import type { Extra } from "../../../types/StayType";

const ExtrasPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { extras, loading } = useGetExtras();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Extra>({
    nameEng: "",
    nameSrb: "",
    price: 0,
  });

  const { extra, loading: loadingExtra } = useGetExtra(selectedId || "");
  const createMutation = useCreateExtra(navigate);
  const { saving, saveExtra } = useUpdateExtra(navigate);
  const { deleteExtra } = useDeleteExtra(navigate);

  const isEdit = !!selectedId;

  useEffect(() => {
    if (extra && selectedId) {
      setFormData({
        nameEng: extra.nameEng,
        nameSrb: extra.nameSrb,
        price: extra.price,
      });
    }
  }, [extra, selectedId]);

  const openCreate = () => {
    setSelectedId(null);
    setFormData({ nameEng: "", nameSrb: "", price: 0 });
    setIsModalOpen(true);
  };

  const openEdit = (id: string) => {
    setSelectedId(id);
    const found = extras.find((e) => e._id === id);
    if (found) {
      setFormData({
        nameEng: found.nameEng,
        nameSrb: found.nameSrb,
        price: found.price,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleSubmit = () => {
    if (isEdit && selectedId) {
      saveExtra({ id: selectedId, extra: formData });
    } else {
      createMutation.mutate(formData);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedId && window.confirm(t("areyousure"))) {
      deleteExtra(selectedId);
      closeModal();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <div className="mb-16 text-5xl font-semibold">{t("extra.extras")}</div>
      <div className="flex gap-2 justify-end mb-8">
        <button className="btn btn-outline" onClick={openCreate}>
          <PlusIcon className="size-8" />
          {t("extra.create")}
        </button>
      </div>

      {loading && (
        <div className="text-center text-primary py-10">{t("loading")}</div>
      )}

      {!loading && extras.length === 0 && (
        <div className="text-center text-primary py-10">
          {t("extra.noextras")}
        </div>
      )}

      {extras.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-base-300">
                <th>{t("extra.nameEng")}</th>
                <th>{t("extra.nameSrb")}</th>
                <th>{t("extra.price")}</th>
              </tr>
            </thead>
            <tbody>
              {extras.map((extra) => (
                <tr
                  key={extra._id}
                  onClick={() => openEdit(extra._id)}
                  className="cursor-pointer transition-all border-l-4
                    border-l-blue-400
                    bg-[rgba(96,165,250,0.08)] hover:bg-[rgba(96,165,250,0.12)]"
                >
                  <td className="font-medium">{extra.nameEng}</td>
                  <td>{extra.nameSrb}</td>
                  <td>{extra.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEdit ? t("extra.edit") : t("extra.create")}
              </h3>
              {isEdit && (
                <button
                  className="btn btn-error btn-outline btn-sm"
                  onClick={handleDelete}
                >
                  <Trash2Icon className="size-4" />
                  {t("extra.delete")}
                </button>
              )}
            </div>

            {isEdit && loadingExtra ? (
              <div className="text-center text-primary py-10">
                {t("loading")}
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <StringInputComp
                  labelText={t("extra.nameEng")}
                  iValue={formData.nameEng}
                  disable={false}
                  onChangeFn={(val) =>
                    setFormData((prev) => ({ ...prev, nameEng: val }))
                  }
                />
                <StringInputComp
                  labelText={t("extra.nameSrb")}
                  iValue={formData.nameSrb}
                  disable={false}
                  onChangeFn={(val) =>
                    setFormData((prev) => ({ ...prev, nameSrb: val }))
                  }
                />
                <NumberInputComp
                  labelText={t("extra.price")}
                  iValue={formData.price}
                  onChangeFn={(val) =>
                    setFormData((prev) => ({ ...prev, price: val }))
                  }
                />

                <div className="flex gap-2 justify-end mt-8">
                  <button className="btn btn-outline" onClick={closeModal}>
                    {t("cancel")}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={createMutation.isPending || saving}
                  >
                    {createMutation.isPending || saving
                      ? t("loading")
                      : isEdit
                        ? t("extra.update")
                        : t("extra.create")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>{t("close")}</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ExtrasPage;
