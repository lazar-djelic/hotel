import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberInputComp from "../../../components/NumberInputComp";
import { useGetCancelPeriod } from "../../api/cancelPeriod/useGetCancelPeriod";
import { useCreateUpdateCancelPeriod } from "../../api/cancelPeriod/useCreateUpdateTaxes";

type CancelPeriodModalProps = {
  onClose: () => void;
};

const CancelPeriodModal = ({ onClose }: CancelPeriodModalProps) => {
  const { t } = useTranslation();
  const { cancelPeriod, loading, isError } = useGetCancelPeriod();
  const mutation = useCreateUpdateCancelPeriod(onClose);

  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (cancelPeriod) {
      setHours(cancelPeriod.hours);
    }
  }, [cancelPeriod]);

  const handleSubmit = () => {
    mutation.mutate({ hours });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg">
        <h3 className="font-bold text-lg">{t("period.manage")}</h3>

        {loading && !isError ? (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        ) : (
          <div className="mt-4 space-y-4">
            <NumberInputComp
              labelText={t("period.hours")}
              iValue={hours}
              onChangeFn={(val) => setHours(val)}
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
                {mutation.isPending ? t("loading") : t("period.save")}
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

export default CancelPeriodModal;
