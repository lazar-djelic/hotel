import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { useStays } from "../api/stays/check-out/useStays";
import { useAddExtra } from "../api/stays/addExtra/useAddExtra";
import { useGetExtras } from "../api/extras/useGetExtras";
import NumberInputComp from "../../components/NumberInputComp";
import type { Stay } from "../../types/StayType";

const AddExtraPage = () => {
  const { t, i18n } = useTranslation();
  const { stays, loading } = useStays();
  const { extras } = useGetExtras();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [selectedExtraId, setSelectedExtraId] = useState<string>("");
  const [extraAmount, setExtraAmount] = useState<number>(0);
  const [search, setSearch] = useState("");

  const isSr = i18n.language.startsWith("sr");

  const filteredStays = stays.filter((stay) =>
    stay.room.roomnum.toString().includes(search),
  );

  const { addExtra } = useAddExtra((updatedStay) => {
    setSelectedStay(updatedStay);
    setSelectedExtraId("");
    setExtraAmount(0);
    setTimeout(() => {
      (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
      setSelectedStay(null);
    }, 100);
  });

  const handleAddExtra = () => {
    if (selectedExtraId !== "" && extraAmount > 0 && selectedStay?._id) {
      addExtra({
        id: selectedStay._id,
        extra: {
          extra: selectedExtraId,
          amount: extraAmount,
        },
      });
    }
  };

  useEffect(() => {
    if (selectedStay) {
      const timer = setTimeout(() => {
        (
          document.getElementById("my_modal_3") as HTMLDialogElement
        )?.showModal();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedStay]);

  const handleModalClose = () => {
    setSelectedStay(null);
    setSelectedExtraId("");
    setExtraAmount(0);
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <div className="mb-16 text-5xl font-semibold">{t("extras")}</div>

        {loading && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        {!loading && stays.length === 0 && (
          <>
            <div className="max-w-7xl mx-auto p-4 mt-8">
              <div className="text-center text-primary py-10">
                {t("stays.nostays")}
              </div>
            </div>
          </>
        )}

        {stays.length > 0 && (
          <div className="overflow-x-auto">
            <div className="form-control mb-4">
              <div className="input-group">
                <input
                  type="text"
                  placeholder={t("extra.searchroom")}
                  className="input input-bordered w-full max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="ml-4 btn-md" onClick={() => setSearch("")}>
                  {t("clear")}
                </button>
              </div>
            </div>

            <table className="table table-lg w-full">
              <thead>
                <tr className="bg-base-300">
                  <th>{t("checkout.room")}</th>
                  <th>{t("checkout.gname")}</th>
                  <th>{t("checkin.checkedin")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredStays.map((stay) => {
                  return (
                    <Fragment key={stay._id}>
                      <tr
                        onClick={() => {
                          setSelectedStay(stay);
                        }}
                        className="cursor-pointer transition-all border-l-4
               border-l-blue-400
               bg-[rgba(96,165,250,0.08)] hover:bg-[rgba(96,165,250,0.12)]"
                      >
                        <td className="font-bold text-lg">
                          {stay.room.roomnum}
                        </td>
                        <td>{`${stay.guest.fName} ${stay.guest.lName[0]}.`}</td>
                        <td>
                          <span className="font-medium">
                            {`${stay.checkIn.getUTCDate()}.${stay.checkIn.getUTCMonth() + 1}.${stay.checkIn.getUTCFullYear()}.`}
                          </span>
                        </td>
                      </tr>
                      {stay.extras && stay.extras.length > 0 && (
                        <tr className="bg-base-100">
                          <td colSpan={3}>
                            <div className="pl-8">
                              <h4 className="font-semibold mb-2">
                                {t("checkout.extras")}
                              </h4>
                              {stay.extras.map((extra: any, i: number) => (
                                <div
                                  key={i}
                                  className="flex justify-between text-sm mb-1"
                                >
                                  <span>
                                    {isSr
                                      ? extra.extra.nameSrb
                                      : extra.extra.nameEng}
                                  </span>
                                  <span>{`${extra.amount} * ${extra.extra.price} = ${extra.amount * extra.extra.price} ${stay.currency}`}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedStay && (
        <dialog id="my_modal_3" className="modal" onClose={handleModalClose}>
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
              <button className="btn btn-outline" onClick={handleModalClose}>
                {t("cancel")}
              </button>
              <button className="btn btn-primary" onClick={handleAddExtra}>
                {t("checkout.addextra")}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleModalClose}>{t("close")}</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AddExtraPage;
