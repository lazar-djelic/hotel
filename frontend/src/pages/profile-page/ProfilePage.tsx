import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../lib/utils";
import StringInputComp from "../../components/StringInputComp";
import SimpleDateInComp from "../../components/SimpleDateInComp";
import type { GuestStruct } from "../api/structs/GuestStruct";
import { guestSimpleSchema } from "../../schemas/guest.response.schema";
import toast from "react-hot-toast";
import { useCreateGuest } from "../api/guests/create-guest/useCreateGuest";
import { useNavigate } from "react-router";
import { useEditGuest } from "../api/guests/edit-guest/useEditGuest";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<GuestStruct | null>(null);

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
      const firstError = parsed.error.issues[0]?.message || "Invalid input";

      toast.error(firstError);
      return;
    }

    if (guest) editGuest({ id: guest._id, guest: parsed.data });
    else createGuest(parsed.data);
  };

  return (
    <div
      className={`mx-auto p-6 ${guest && !form ? "max-w-2xl" : "max-w-5xl"}`}
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
