import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import type { SimpleAmenityStruct } from "../../api/structs/AmenityStruct";
import {
  AMENITY_TYPES,
  CURRENCIES,
  type CurrType,
} from "../../../config/enums";
import StringInputComp from "../../../components/StringInputComp";
import SelectComp from "../../../components/SelectComp";
import NumberInputComp from "../../../components/NumberInputComp";
import CheckboxComp from "../../../components/CheckboxComp";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useCreateAmenity } from "../../api/amenities/amenity/useCreateAmenity";
import { useUpdateAmenity } from "../../api/amenities/amenity/useUpdateAmenity";
import { useAmenity } from "../../api/amenities/amenity/useAmenity";
import { amenitySimpleSchema } from "../../../schemas/amenity.response.schema";
import { useDeleteAmenity } from "../../api/amenities/amenity/useDeleteAmenity";
import { ROUTES } from "../../../config/routes";

const AmenityPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { deleteAmenity, isDeleting } = useDeleteAmenity(navigate);
  const { amenity, loading } = useAmenity(id!, !isDeleting);
  const { mutate: createAmenity, isPending: saving } =
    useCreateAmenity(navigate);
  const { mutate: updateAmenity, isPending: updating } =
    useUpdateAmenity(navigate);

  const [formData, setFormData] = useState<SimpleAmenityStruct>({
    name: "",
    type: AMENITY_TYPES.spa,
    capacity: 1,
    slotDuration: 30,
    openTime: "09:00",
    closeTime: "21:00",
    requiresReservation: true,
    onePerSlot: false,
    price: 0,
    currency: CURRENCIES.rsd,
  });

  useEffect(() => {
    if (amenity) {
      setFormData({
        name: amenity.name,
        type: amenity.type,
        capacity: amenity.capacity,
        slotDuration: amenity.slotDuration,
        openTime: amenity.openTime,
        closeTime: amenity.closeTime,
        requiresReservation: amenity.requiresReservation,
        onePerSlot: amenity.onePerSlot,
        price: amenity.price,
        currency: amenity.currency,
      });
    }
  }, [amenity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = amenitySimpleSchema.safeParse(formData);

    if (!parsed.success) {
      toast.error("Invalid amenity data");
      throw new Error("Invalid amenity data");
    }

    if (isEdit) {
      updateAmenity({ id: id!, amenity: formData });
    } else {
      createAmenity(formData);
    }
  };

  const isLoading2 = saving || updating;

  if (isEdit && loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-primary">{t("loading")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigate(ROUTES.ADMIN.AMENITIES)}
          className="btn btn-ghost btn-md"
          disabled={isLoading2}
        >
          <ArrowLeftIcon className="size-5" />
          {t("back")}
        </button>

        {isEdit && (
          <button
            className="btn btn-error btn-outline"
            onClick={() => {
              if (window.confirm(t("areyousure"))) {
                deleteAmenity(id!);
              }
            }}
          >
            <Trash2Icon className="size-5" />
            {t("amenity.delete")}
          </button>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-semibold">
          {isEdit ? t("amenity.edit") : t("amenity.create")}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <StringInputComp
          labelText={t("amenity.name")}
          iValue={formData.name}
          disable={false}
          onChangeFn={(value) =>
            setFormData((prev) => ({ ...prev, name: value }))
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectComp
            labelText={t("amenity.type")}
            sValue={formData.type}
            onChangeFn={(value) =>
              setFormData((prev) => ({
                ...prev,
                type: value as SimpleAmenityStruct["type"],
              }))
            }
            options={[
              { value: AMENITY_TYPES.spa, label: t("config.spa") },
              {
                value: AMENITY_TYPES.restaurant,
                label: t("config.restaurant"),
              },
              {
                value: AMENITY_TYPES.conference,
                label: t("config.conference"),
              },
              { value: AMENITY_TYPES.pool, label: t("config.pool") },
              { value: AMENITY_TYPES.gym, label: t("config.gym") },
              { value: AMENITY_TYPES.sauna, label: t("config.sauna") },
            ]}
          />

          <NumberInputComp
            labelText={t("amenity.capacity")}
            iValue={formData.capacity}
            onChangeFn={(value) =>
              setFormData((prev) => ({ ...prev, capacity: value }))
            }
          />

          <NumberInputComp
            labelText={t("amenity.price")}
            iValue={formData.price}
            onChangeFn={(value) =>
              setFormData((prev) => ({ ...prev, price: value }))
            }
          />

          <SelectComp
            labelText={t("amenity.currency")}
            sValue={formData.currency}
            onChangeFn={(value) =>
              setFormData((prev) => ({
                ...prev,
                currency: value as CurrType,
              }))
            }
            options={[
              { value: CURRENCIES.rsd, label: CURRENCIES.rsd },
              { value: CURRENCIES.eur, label: CURRENCIES.eur },
            ]}
          />

          <div>
            <label className="label">
              <span className="label-text">{t("amenity.opentime")}</span>
            </label>
            <input
              type="time"
              value={formData.openTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, openTime: e.target.value }))
              }
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">{t("amenity.closetime")}</span>
            </label>
            <input
              type="time"
              value={formData.closeTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, closeTime: e.target.value }))
              }
              className="input input-bordered w-full"
            />
          </div>

          <NumberInputComp
            labelText={`${t("amenity.slotdur")} (min)`}
            iValue={formData.slotDuration}
            onChangeFn={(value) =>
              setFormData((prev) => ({ ...prev, slotDuration: value }))
            }
          />

          <div className="h-32">
            <div className="mt-4">
              <CheckboxComp
                labelText={t("amenity.oneperslot")}
                isCheck={formData.onePerSlot}
                onChangeFn={(checked) =>
                  setFormData((prev) => ({ ...prev, onePerSlot: checked }))
                }
              />

              <div className="mt-4">
                <CheckboxComp
                  labelText={t("amenity.resreq")}
                  isCheck={formData.requiresReservation}
                  onChangeFn={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      requiresReservation: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ADMIN.AMENITIES)}
            className="btn btn-outline"
            disabled={isLoading2}
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading2}
          >
            {isLoading2 ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                {isEdit ? t("amenity.loadbtnup") : t("amenity.loadbtncr")}
              </>
            ) : isEdit ? (
              t("amenity.btnup")
            ) : (
              t("amenity.btncr")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmenityPage;
