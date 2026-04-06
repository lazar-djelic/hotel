import { useState } from "react";
import NumberInputComp from "../../components/NumberInputComp";
import { EXTRA_OPTIONS } from "../../config/enums";
import type { Stay } from "../../types/StayType";
import { useAddExtra } from "../api/stays/addExtra/useAddExtra";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BillingProps {
  stay: Stay;
  onStayUpdated?: (updatedStay: Stay) => void;
}

const BillingSection = ({ stay, onStayUpdated }: BillingProps) => {
  const { t } = useTranslation();
  const [extraType, setExtraType] = useState<string>("");
  const [extraAmount, setExtraAmount] = useState<number>(0);

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date().getTime() - new Date(stay.checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const roomTotal = (stay.rate || stay.room.rate) * nights;

  const extrasTotal =
    stay.extras?.reduce((sum: number, e: any) => sum + e.amount, 0) || 0;

  const total = roomTotal + extrasTotal;

  const { addExtra, loadingUpdate } = useAddExtra((updatedStay) => {
    if (onStayUpdated) {
      onStayUpdated(updatedStay);
    }
    setExtraType("");
    setExtraAmount(0);
    setTimeout(() => {
      (document.getElementById("my_modal_2") as HTMLDialogElement)?.close();
    }, 100);
  });

  return (
    <div className="bg-base-200 p-4 rounded-xl space-y-4">
      <h2 className="font-semibold">{t("checkout.billing")}</h2>

      <div className="flex justify-between">
        <span>
          {t("checkout.room")} ({nights} {t("checkout.nights")} x{" "}
          {stay.rate || stay.room.rate})
        </span>
        <span>{`${roomTotal} ${stay.currency}`}</span>
      </div>

      <div>
        <h3 className="font-medium mb-2">{t("checkout.extras")}</h3>

        {stay.extras?.map((e: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>{e.type}</span>
            <span>{`${e.amount} ${stay.currency}`}</span>
          </div>
        ))}

        <button
          className="btn btn-sm btn-outline mt-4"
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            )?.showModal()
          }
        >
          <PlusIcon /> {t("checkout.addextra")}
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-11/12 max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg">{t("checkout.addextra")}</h3>
            <div className="mt-8 space-y-4 flex-1">
              <div>
                <label className="label">
                  <span className="label-text">{t("checkout.extratype")}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder={t("checkout.typeorselect")}
                  value={extraType}
                  onChange={(e) => setExtraType(e.target.value)}
                  list="extra-options"
                />
                <datalist id="extra-options">
                  {Object.values(EXTRA_OPTIONS).map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>

              <NumberInputComp
                labelText={t("checkout.amount")}
                iValue={extraAmount}
                onChangeFn={(val) => setExtraAmount(val)}
              />
            </div>

            <div className="flex gap-2 justify-end mt-16">
              <button
                className="btn btn-outline"
                onClick={() =>
                  (
                    document.getElementById("my_modal_2") as HTMLDialogElement
                  )?.close()
                }
              >
                {t("cancel")}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (extraType !== "" && extraAmount > 0) {
                    addExtra({
                      id: stay._id,
                      extra: {
                        type: extraType,
                        amount: extraAmount,
                      },
                    });
                  }
                }}
              >
                {t("checkout.addextra")}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>{t("close")}</button>
          </form>
        </dialog>
      </div>

      <div className="divider"></div>

      <div className="flex justify-between font-semibold text-lg">
        <span>{t("checkout.total")}</span>
        <span>{`${total} ${stay.currency}`}</span>
      </div>
    </div>
  );
};

export default BillingSection;
