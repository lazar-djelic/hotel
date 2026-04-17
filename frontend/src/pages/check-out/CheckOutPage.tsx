import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Stay } from "../../types/StayType";
import { useStays } from "../api/stays/check-out/useStays";
import { ArrowRightIcon } from "lucide-react";
import BillingSection from "./BillingSection";
import { useCheckOut } from "../api/stays/check-out/useCheckOut";
import { useNavigate } from "react-router";
import { formatDate } from "../api/roomReservations/formatDate";

const CheckOutPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [screen, setScreen] = useState<number>(1);
  const [globalStay, setGlobalStay] = useState<Stay | undefined>(undefined);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null,
  );
  const { stays, loading } = useStays();

  const { checkOut } = useCheckOut(
    navigate,
    globalStay?._id,
    globalStay?.notes,
  );

  return (
    <div>
      {screen == 1 && (
        <div className="max-w-6xl mx-auto p-4 mt-8">
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
              <table className="table table-lg w-full">
                <thead>
                  <tr className="bg-base-300">
                    <th>{t("checkout.room")}</th>
                    <th>{t("checkout.gname")}</th>
                    <th>{t("checkin.checkedin")}</th>
                  </tr>
                </thead>
                <tbody>
                  {stays.map((stay, index) => {
                    const isSelected = selectedSlotIndex === index;

                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          setGlobalStay(stay);
                          setSelectedSlotIndex(index);
                        }}
                        className={`cursor-pointer transition-all border-l-4 "border-l-green-500"
                         ${isSelected && "bg-[#2276c540]"}`}
                      >
                        <td className="font-bold text-lg">
                          {stay.room.roomnum}
                        </td>
                        <td>{`${stay.guest.fName} ${stay.guest.lName[0]}.`}</td>
                        <td>
                          <span className="font-medium">
                            {`${stay.checkIn.getUTCDate()}.${stay.checkIn.getUTCMonth()}.${stay.checkIn.getUTCFullYear()}.`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {selectedSlotIndex !== null && (
            <div className="flex justify-end mx-auto mt-4">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={() => {
                  setScreen(2);
                }}
              >
                {t("nextpage")}
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {screen == 2 && globalStay && (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-semibold">{t("checkout.title")}</h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-base-200 p-4 rounded-xl">
              <h2 className="font-semibold mb-2">{t("checkout.guestinfo")}</h2>
              <p>
                {globalStay.guest.fName} {globalStay.guest.lName}
              </p>
              <p>{globalStay.guest.email}</p>
              <p>{globalStay.guest.phone}</p>
            </div>

            <div className="bg-base-200 p-4 rounded-xl">
              <h2 className="font-semibold mb-2">{t("checkout.staydet")}</h2>
              <p>
                {t("checkout.room")}: {globalStay.room.roomnum}
              </p>
              <p>
                {t("checkout.adults")}: {globalStay.adults || 1}
              </p>
              <p>
                {t("checkout.children")}: {globalStay.children || 0}
              </p>
              <p>
                {t("checkout.checkin")}: {formatDate(globalStay.checkIn)}
              </p>
              <p>
                {t("checkout.checkout")}: {formatDate(globalStay.checkOut)}
              </p>
            </div>
          </div>

          <BillingSection
            stay={globalStay}
            onStayUpdated={(updatedStay) => setGlobalStay(updatedStay)}
          />

          {globalStay.paid ? (
            <div
              role="alert"
              className="alert alert-success flex justify-center"
            >
              <span className="font-bold text-lg">{t("checkin.paid")}</span>
            </div>
          ) : (
            <></>
          )}

          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="font-semibold mb-2">{t("checkout.notes")}</h2>
            <textarea
              className="textarea textarea-bordered w-full"
              value={globalStay.notes || ""}
              onChange={(e) =>
                setGlobalStay((prev) =>
                  prev ? { ...prev, notes: e.target.value } : prev,
                )
              }
            />
          </div>

          <div className="flex justify-end gap-4">
            <button className="btn btn-outline" onClick={() => setScreen(1)}>
              {t("cancel")}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                if (globalStay !== undefined) checkOut();
              }}
            >
              {t("checkout.checkout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutPage;
