import { useState } from "react";
import NumberInputComp from "../../components/NumberInputComp";
import type { Stay } from "../../types/StayType";
import { useAddExtra } from "../api/stays/addExtra/useAddExtra";
import { useGetExtras } from "../api/extras/useGetExtras";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetTaxes } from "../api/taxes/useGetTaxes";

interface BillingProps {
  stay: Stay;
  onStayUpdated?: (updatedStay: Stay) => void;
}

const BillingSection = ({ stay, onStayUpdated }: BillingProps) => {
  const { t, i18n } = useTranslation();
  const { extras } = useGetExtras();
  const [selectedExtraId, setSelectedExtraId] = useState<string>("");
  const [extraAmount, setExtraAmount] = useState<number>(0);
  const { taxes } = useGetTaxes();

  const isSr = i18n.language.startsWith("sr");

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(stay.checkOut).getTime() - new Date(stay.checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const roomTotal = (stay.rate || stay.room.rate) * nights;

  const extrasTotal =
    stay.extras?.reduce(
      (sum: number, e: any) => sum + e.amount * e.extra.price,
      0,
    ) || 0;

  const taxAdTotal = taxes
    ? taxes.touristTaxAd * nights * (stay.adults ?? 1)
    : 0;
  const taxChTotal = taxes
    ? taxes.touristTaxCh * nights * (stay.children ?? 0)
    : 0;
  const taxesTotal = taxAdTotal + taxChTotal;

  const total = roomTotal + extrasTotal + taxesTotal;

  const { addExtra, loadingUpdate } = useAddExtra((updatedStay) => {
    if (onStayUpdated) {
      onStayUpdated(updatedStay);
    }
    setSelectedExtraId("");
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
          {t("checkout.room")} ({nights} {t("checkout.nights")})
        </span>
        <span>{`${nights} * ${stay.rate || stay.room.rate} = ${roomTotal} ${stay.currency}`}</span>
      </div>

      <div>
        <h3 className="font-semibold mb-2">{t("checkout.extras")}</h3>

        {stay.extras?.map((e: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>{isSr ? e.extra.nameSrb : e.extra.nameEng}</span>
            <span>{`${e.amount} * ${e.extra.price} = ${e.amount * e.extra.price} ${stay.currency}`}</span>
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
                <select
                  className="select select-bordered w-full"
                  value={selectedExtraId}
                  onChange={(e) => setSelectedExtraId(e.target.value)}
                >
                  <option value="" disabled>
                    {t("extra.select")}
                  </option>
                  {extras.map((ex) => (
                    <option key={ex._id} value={ex._id}>
                      {isSr ? ex.nameSrb : ex.nameEng}
                    </option>
                  ))}
                </select>
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
                  if (selectedExtraId !== "" && extraAmount > 0) {
                    addExtra({
                      id: stay._id,
                      extra: {
                        extra: selectedExtraId,
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

      <div>
        <h3 className="font-semibold mb-2">{t("payment.taxes")}</h3>
        {taxes && taxAdTotal > 0 && (
          <div className="flex justify-between">
            <span>
              {t("payment.touristTaxAd")} ({nights} {t("checkout.nights")} x{" "}
              {stay.adults ?? 1} {t("checkout.adults")})
            </span>
            <span>{`${stay.adults} * ${nights} * ${taxes.touristTaxAd} = ${taxAdTotal.toFixed(2)} ${stay.currency}`}</span>
          </div>
        )}
        {taxes && taxChTotal > 0 && (
          <div className="flex justify-between">
            <span>
              {t("payment.touristTaxCh")} ({nights} {t("checkout.nights")} x{" "}
              {stay.children ?? 0} {t("checkout.children")})
            </span>
            <span>{`${stay.children} * ${nights} * ${taxes.touristTaxCh} = ${taxChTotal.toFixed(2)} ${stay.currency}`}</span>
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div className="flex justify-between font-semibold text-lg">
        <span>{t("checkout.total")}</span>
        <span>{`${total.toFixed(2)} ${stay.currency}`}</span>
      </div>
    </div>
  );
};

export default BillingSection;
