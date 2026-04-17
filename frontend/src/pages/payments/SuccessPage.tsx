import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoaderIcon, CheckCircleIcon } from "lucide-react";
import api from "../../lib/axios";
import { useRoomReservation } from "../api/roomReservations/room-reservation-detail/useRoomReservation";
import { useStay } from "../api/stays/useStay";
import { useGetTaxes } from "../api/taxes/useGetTaxes";
import { useFullAmenityReservation } from "./useFullAmenityReservation";
import { t } from "i18next";

const fmtDate = (d: Date) =>
  `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}.`;

const fmtTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const fmtMoney = (n: number, curr: string) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;

type LineItem = {
  name: string;
  unit: number;
  qty: number;
  total: number;
};

type CheckoutSessionData = {
  type: "stay" | "roomres" | "amres";
  metadata: {
    stayId?: string;
    roomresId?: string;
    amresId?: string;
  };
  paymentStatus: string;
};

const SuccessPage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState<CheckoutSessionData | null>(
    null,
  );
  const [loadingSession, setLoadingSession] = useState(true);
  const { taxes } = useGetTaxes();
  const isSr = i18n.language.startsWith("sr");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    api
      .get<CheckoutSessionData>(`/payments/checkout-session/${sessionId}`)
      .then((res) => {
        setSessionData(res.data);
      })
      .finally(() => setLoadingSession(false));
  }, [sessionId]);

  const stayId = sessionData?.metadata?.stayId ?? "";
  const { stay, loading: loadingStay } = useStay(stayId);

  const roomresId = sessionData?.metadata?.roomresId ?? "";
  const { roomReservation, loading: loadingRoomres } =
    useRoomReservation(roomresId);

  const amresId = sessionData?.metadata?.amresId ?? "";
  const { amenityReservation, loading: loadingAmres } =
    useFullAmenityReservation(amresId);

  const isLoading =
    loadingSession || loadingStay || loadingRoomres || loadingAmres;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-lg">{t("loading")}</p>
      </div>
    );
  }

  // --- Stay bill ---
  if (stay && sessionData.type === "stay") {
    const curr = stay.currency ?? "RSD";
    const days = Math.max(
      1,
      Math.floor(
        (stay.checkOut.getTime() - stay.checkIn.getTime()) /
          (1000 * 60 * 60 * 24),
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
      <SuccessBillLayout
        title={t("payment.stayBill")}
        dateLabel={`${fmtDate(stay.checkIn)} — ${fmtDate(stay.checkOut)}  ·  ${days} ${days === 1 ? t("payment.night") : t("payment.nights")}`}
      >
        <SuccessIndicator />

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
          paid={true}
          paidDate={stay.paidDate}
          t={t}
        />
      </SuccessBillLayout>
    );
  }

  // --- Room reservation bill ---
  if (roomReservation && sessionData.type === "roomres") {
    const curr = roomReservation.currency;
    const days = Math.max(
      1,
      Math.floor(
        (roomReservation.endDate.getTime() -
          roomReservation.startDate.getTime()) /
          (1000 * 60 * 60 * 24),
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
      <SuccessBillLayout
        title={t("payment.reservationBill")}
        dateLabel={`${fmtDate(roomReservation.startDate)} — ${fmtDate(roomReservation.endDate)}  ·  ${days} ${days === 1 ? t("payment.night") : t("payment.nights")}`}
      >
        <SuccessIndicator />

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
          paid={true}
          paidDate={roomReservation.paidDate}
          t={t}
        />
      </SuccessBillLayout>
    );
  }

  // --- Amenity reservation bill ---
  if (amenityReservation && sessionData.type === "amres") {
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
      <SuccessBillLayout
        title={t("payment.amenityBill")}
        dateLabel={`${fmtDate(amenityReservation.startTime)}  ·  ${fmtTime(amenityReservation.startTime)} — ${fmtTime(amenityReservation.endTime)}`}
      >
        <SuccessIndicator />

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
          paid={true}
          paidDate={amenityReservation.paidDate}
          t={t}
        />
      </SuccessBillLayout>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <p className="text-lg">{t("loading")}</p>
    </div>
  );
};

// --- Sub-components ---

const SuccessBillLayout = ({
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
        <div className="card bg-base-100 shadow-xl border-2 border-success">
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

const SuccessIndicator = () => (
  <div className="bg-success/10 border border-success/50 rounded-xl p-4 mb-6 flex items-center gap-3">
    <CheckCircleIcon className="size-8 text-success flex-shrink-0" />
    <div>
      <p className="font-semibold text-success">{t("payment.paymentSucc")}</p>
      <p className="text-sm text-success/80">{t("payment.paymentProc")}</p>
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
      <span className="text-success font-semibold">{t("payment.paid")}</span>
    </div>
    {paidDate && (
      <div className="flex justify-between text-sm">
        <span className="opacity-70">{t("payment.paidDate")}</span>
        <span>{fmtDate(paidDate)}</span>
      </div>
    )}
  </div>
);

export default SuccessPage;
