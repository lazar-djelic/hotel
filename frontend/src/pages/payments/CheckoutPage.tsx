import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { LoaderIcon } from "lucide-react";
import { usePaymentAmres } from "../api/payments/usePaymentAmres";
import { usePaymentRoomres } from "../api/payments/usePaymentRoomres";
import { usePaymentStay } from "../api/payments/usePaymentStay";
import { useRoomReservation } from "../api/roomReservations/room-reservation-detail/useRoomReservation";
import { useStay } from "../api/stays/useStay";
import { useGetTaxes } from "../api/taxes/useGetTaxes";
import { useFullAmenityReservation } from "../api/payments/useFullAmenityReservation";

const fmtDate = (d: Date) =>
  `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}.`;

const fmtTime = (d: Date) =>
  `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;

const fmtMoney = (n: number, curr: string) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;

type LineItem = {
  name: string;
  unit: number;
  qty: number;
  total: number;
};

const CheckoutPage = () => {
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const { taxes } = useGetTaxes();
  const isSr = i18n.language.startsWith("sr");

  const stayId = state?.stay?._id ?? state?.stay;
  const { stay, loading: loadingStay } = useStay(stayId);

  const roomresId = state?.roomres?._id ?? state?.roomres;
  const { roomReservation, loading: loadingRoomres } =
    useRoomReservation(roomresId);

  const amresId = state?.amres?._id ?? state?.amres;
  const { amenityReservation, loading: loadingAmres } =
    useFullAmenityReservation(amresId);

  const { mutate: payStay, isPending: isPayingStay } = usePaymentStay();
  const { mutate: payRoomres, isPending: isPayingRoomres } =
    usePaymentRoomres();
  const { mutate: payAmres, isPending: isPayingAmres } = usePaymentAmres();

  const isLoading = loadingStay || loadingRoomres || loadingAmres;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  // --- Stay bill ---
  if (stay) {
    const curr = stay.currency ?? "RSD";
    const checkInMid = new Date(stay.checkIn);
    checkInMid.setUTCHours(0, 0, 0, 0);
    const checkOutMid = new Date(stay.checkOut);
    checkOutMid.setUTCHours(0, 0, 0, 0);
    const days = Math.max(
      1,
      Math.floor(
        (checkOutMid.getTime() - checkInMid.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );
    const roomTypeTrans = t(`payment.${stay.room.type}`);
    const bedTrans = t(`payment.${stay.room.bednum}`);

    const lines: LineItem[] = [];
    lines.push({
      name: `${t("payment.room")} ${stay.room.roomnum}`,
      unit: stay.rate ?? stay.room.rate,
      qty: days,
      total: (stay.rate ?? stay.room.rate) * days,
    });

    if (taxes) {
      const taxAdTotal = taxes.touristTaxAd * days * (stay.adults ?? 1);
      lines.push({
        name: t("payment.touristTaxAd"),
        unit: taxes.touristTaxAd,
        qty: days * (stay.adults ?? 1),
        total: taxAdTotal,
      });
      if ((stay.children ?? 0) > 0) {
        const taxChTotal = taxes.touristTaxCh * days * (stay.children ?? 0);
        lines.push({
          name: t("payment.touristTaxCh"),
          unit: taxes.touristTaxCh,
          qty: days * (stay.children ?? 0),
          total: taxChTotal,
        });
      }
    }

    for (const e of stay.extras ?? []) {
      lines.push({
        name: isSr ? e.extra.nameSrb : e.extra.nameEng,
        unit: e.extra.price,
        qty: e.amount,
        total: e.extra.price * e.amount,
      });
    }

    const grandTotal = lines.reduce((s, l) => s + l.total, 0);

    return (
      <BillLayout
        title={t("payment.stayBill")}
        dateLabel={`${fmtDate(stay.checkIn)} — ${fmtDate(stay.checkOut)}  ·  ${days} ${days === 1 ? t("payment.night") : t("payment.nights")}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InfoBox title={t("payment.guest")}>
            <InfoRow
              label={t("payment.name")}
              value={`${stay.guest.fName} ${stay.guest.lName}`}
            />
            <InfoRow label={t("payment.email")} value={stay.guest.email} />
            <InfoRow label={t("payment.address")} value={stay.guest.address} />
          </InfoBox>
          <InfoBox title={t("payment.room")}>
            <InfoRow
              label={t("payment.roomNumber")}
              value={String(stay.room.roomnum)}
            />
            <InfoRow label={t("payment.type")} value={roomTypeTrans} />
            <InfoRow label={t("payment.bed")} value={bedTrans} />
            <InfoRow
              label={t("checkout.adults")}
              value={String(stay.adults ?? 1)}
            />
            {(stay.children ?? 0) > 0 && (
              <InfoRow
                label={t("checkout.children")}
                value={String(stay.children)}
              />
            )}
          </InfoBox>
        </div>

        <LineItemsTable lines={lines} curr={curr} t={t} />

        <TotalSection
          grandTotal={grandTotal}
          curr={curr}
          paid={stay.paid}
          paidDate={stay.paidDate}
          t={t}
        />

        {!stay.paid && (
          <div className="flex justify-end mt-6">
            <button
              className="btn btn-primary btn-lg"
              disabled={isPayingStay}
              onClick={() => payStay(stayId)}
            >
              {isPayingStay ? t("payment.processing") : t("pay")}
            </button>
          </div>
        )}
      </BillLayout>
    );
  }

  // --- Room reservation bill ---
  if (roomReservation) {
    const curr = roomReservation.currency;
    const startMid = new Date(roomReservation.startDate);
    startMid.setUTCHours(0, 0, 0, 0);
    const endMid = new Date(roomReservation.endDate);
    endMid.setUTCHours(0, 0, 0, 0);
    const days = Math.max(
      1,
      Math.floor(
        (endMid.getTime() - startMid.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );
    const roomTypeTrans = t(`payment.${roomReservation.assignedRoom.type}`);
    const bedTrans = t(`payment.${roomReservation.assignedRoom.bednum}`);

    const lines: LineItem[] = [];
    lines.push({
      name: `${t("payment.room")} ${roomReservation.assignedRoom.roomnum}`,
      unit: roomReservation.rate,
      qty: days,
      total: roomReservation.rate * days,
    });

    if (taxes) {
      const taxAdTotal = taxes.touristTaxAd * days * roomReservation.adults;
      lines.push({
        name: t("payment.touristTaxAd"),
        unit: taxes.touristTaxAd,
        qty: days * roomReservation.adults,
        total: taxAdTotal,
      });
      if (roomReservation.children > 0) {
        const taxChTotal = taxes.touristTaxCh * days * roomReservation.children;
        lines.push({
          name: t("payment.touristTaxCh"),
          unit: taxes.touristTaxCh,
          qty: days * roomReservation.children,
          total: taxChTotal,
        });
      }
    }

    const grandTotal = lines.reduce((s, l) => s + l.total, 0);

    return (
      <BillLayout
        title={t("payment.reservationBill")}
        dateLabel={`${fmtDate(roomReservation.startDate)} — ${fmtDate(roomReservation.endDate)}  ·  ${days} ${days === 1 ? t("payment.night") : t("payment.nights")}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InfoBox title={t("payment.guest")}>
            <InfoRow
              label={t("payment.name")}
              value={`${roomReservation.guest.fName} ${roomReservation.guest.lName}`}
            />
            <InfoRow
              label={t("payment.email")}
              value={roomReservation.guest.email}
            />
            <InfoRow
              label={t("payment.address")}
              value={roomReservation.guest.address}
            />
          </InfoBox>
          <InfoBox title={t("payment.room")}>
            <InfoRow
              label={t("payment.roomNumber")}
              value={String(roomReservation.assignedRoom.roomnum)}
            />
            <InfoRow label={t("payment.type")} value={roomTypeTrans} />
            <InfoRow label={t("payment.bed")} value={bedTrans} />
            <InfoRow
              label={t("checkout.adults")}
              value={String(roomReservation.adults)}
            />
            {roomReservation.children > 0 && (
              <InfoRow
                label={t("checkout.children")}
                value={String(roomReservation.children)}
              />
            )}
          </InfoBox>
        </div>

        <LineItemsTable lines={lines} curr={curr} t={t} />

        <TotalSection
          grandTotal={grandTotal}
          curr={curr}
          paid={roomReservation.paid}
          paidDate={roomReservation.paidDate}
          t={t}
        />

        {!roomReservation.paid && (
          <div className="flex justify-end mt-6">
            <button
              className="btn btn-primary btn-lg"
              disabled={isPayingRoomres}
              onClick={() => payRoomres(roomresId)}
            >
              {isPayingRoomres ? t("payment.processing") : t("pay")}
            </button>
          </div>
        )}
      </BillLayout>
    );
  }

  // --- Amenity reservation bill ---
  if (amenityReservation) {
    const curr = amenityReservation.currency;
    const amenityTypeTrans = t(`payment.${amenityReservation.amenity.type}`);

    const lines: LineItem[] = [];
    lines.push({
      name: amenityReservation.amenity.name,
      unit: amenityReservation.rate,
      qty: 1,
      total: amenityReservation.rate,
    });

    const grandTotal = lines.reduce((s, l) => s + l.total, 0);

    return (
      <BillLayout
        title={t("payment.amenityBill")}
        dateLabel={`${fmtDate(amenityReservation.startTime)}  ·  ${fmtTime(amenityReservation.startTime)} — ${fmtTime(amenityReservation.endTime)}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {amenityReservation.guest && (
            <InfoBox title={t("payment.guest")}>
              <InfoRow
                label={t("payment.name")}
                value={`${amenityReservation.guest.fName} ${amenityReservation.guest.lName}`}
              />
              <InfoRow
                label={t("payment.email")}
                value={amenityReservation.guest.email}
              />
              <InfoRow
                label={t("payment.address")}
                value={amenityReservation.guest.address}
              />
            </InfoBox>
          )}
          <InfoBox title={t("payment.amenity")}>
            <InfoRow
              label={t("payment.name")}
              value={amenityReservation.amenity.name}
            />
            <InfoRow
              label={t("payment.amenityType")}
              value={amenityTypeTrans}
            />
            <InfoRow
              label={t("payment.people")}
              value={String(amenityReservation.numberOfPeople)}
            />
            <InfoRow
              label={t("payment.time")}
              value={`${fmtTime(amenityReservation.startTime)} — ${fmtTime(amenityReservation.endTime)}`}
            />
          </InfoBox>
        </div>

        <LineItemsTable lines={lines} curr={curr} t={t} />

        <TotalSection
          grandTotal={grandTotal}
          curr={curr}
          paid={amenityReservation.paid}
          paidDate={amenityReservation.paidDate}
          t={t}
        />

        {!amenityReservation.paid && (
          <div className="flex justify-end mt-6">
            <button
              className="btn btn-primary btn-lg"
              disabled={isPayingAmres}
              onClick={() => payAmres(amresId)}
            >
              {isPayingAmres ? t("payment.processing") : t("pay")}
            </button>
          </div>
        )}
      </BillLayout>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <p className="text-lg">{t("loading")}</p>
    </div>
  );
};

// --- Sub-components ---

const BillLayout = ({
  title,
  dateLabel,
  children,
}: {
  title: string;
  dateLabel: string;
  children: React.ReactNode;
}) => (
  <div className="bg-base-200 min-h-screen">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-base-300">
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-sm opacity-70">{dateLabel}</p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const InfoBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-base-200 p-4 rounded-xl">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <p className="text-sm">
    <span className="opacity-70">{label}: </span>
    <span className="font-medium">{value}</span>
  </p>
);

const LineItemsTable = ({
  lines,
  curr,
  t,
}: {
  lines: LineItem[];
  curr: string;
  t: (key: string) => string;
}) => (
  <div className="overflow-x-auto mb-6">
    <table className="table table-zebra w-full">
      <thead>
        <tr className="bg-base-300">
          <th>#</th>
          <th>{t("payment.item")}</th>
          <th className="text-right">{t("payment.unitPrice")}</th>
          <th className="text-right">{t("payment.quantity")}</th>
          <th className="text-right">{t("payment.total")}</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((l, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td className="font-medium">{l.name}</td>
            <td className="text-right">{fmtMoney(l.unit, curr)}</td>
            <td className="text-right">{l.qty}</td>
            <td className="text-right">{fmtMoney(l.total, curr)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TotalSection = ({
  grandTotal,
  curr,
  paid,
  paidDate,
  t,
}: {
  grandTotal: number;
  curr: string;
  paid: boolean;
  paidDate?: Date;
  t: (key: string) => string;
}) => (
  <div className="bg-base-200 p-4 rounded-xl space-y-2">
    <div className="flex justify-between text-lg font-bold">
      <span>{t("payment.total")}</span>
      <span>{fmtMoney(grandTotal, curr)}</span>
    </div>
    <div className="divider my-1"></div>
    <div className="flex justify-between text-sm">
      <span className="opacity-70">{t("payment.paymentStatus")}</span>
      <span
        className={
          paid ? "text-success font-semibold" : "text-warning font-semibold"
        }
      >
        {paid ? t("payment.paid") : t("payment.unpaid")}
      </span>
    </div>
    {paidDate && (
      <div className="flex justify-between text-sm">
        <span className="opacity-70">{t("payment.paidDate")}</span>
        <span>{fmtDate(paidDate)}</span>
      </div>
    )}
  </div>
);

export default CheckoutPage;
