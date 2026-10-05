import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetTaxes } from "../../api/taxes/useGetTaxes";
import { useCreateUpdateTaxes } from "../../api/taxes/useCreateUpdateTaxes";
import NumberInputComp from "../../../components/NumberInputComp";

type TaxesModalProps = {
  onClose: () => void;
};

const TaxesModal = ({ onClose }: TaxesModalProps) => {
  const { t } = useTranslation();
  const { taxes, loading, isError } = useGetTaxes();
  const mutation = useCreateUpdateTaxes(onClose);

  const [touristTaxAd, setTouristTaxAd] = useState(0);
  const [touristTaxCh, setTouristTaxCh] = useState(0);

  useEffect(() => {
    if (taxes) {
      setTouristTaxAd(taxes.touristTaxAd);
      setTouristTaxCh(taxes.touristTaxCh);
    }
  }, [taxes]);

  const handleSubmit = () => {
    mutation.mutate({ touristTaxAd, touristTaxCh });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg">
        <h3 className="font-bold text-lg">{t("taxes.manage")}</h3>

        {loading && !isError ? (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        ) : (
          <div className="mt-4 space-y-4">
            <NumberInputComp
              labelText={t("taxes.touristTaxAd")}
              iValue={touristTaxAd}
              onChangeFn={(val) => setTouristTaxAd(val)}
            />
            <NumberInputComp
              labelText={t("taxes.touristTaxCh")}
              iValue={touristTaxCh}
              onChangeFn={(val) => setTouristTaxCh(val)}
            />

            <div className="flex gap-2 justify-end mt-8">
              <button className="btn btn-outline" onClick={onClose}>
                {t("cancel")}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? t("loading") : t("taxes.save")}
              </button>
            </div>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>{t("close")}</button>
      </form>
    </dialog>
  );
};

export default TaxesModal;
