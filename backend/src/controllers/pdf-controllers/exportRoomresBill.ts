import { type Request, type Response } from "express";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import RoomReservation from "../../models/RoomReservation.ts";
import { roomReservationSchema } from "../../schemas/roomReservation.response.schema.ts";
import Taxes from "../../models/Taxes.ts";
import { taxesSchema } from "../../schemas/taxes.schema.ts";
import { roomTypeTranslations, bedNumTranslations } from "./exportStayBill.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const styles = readFileSync(join(__dirname, "style.css"), "utf-8");

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;

const fmtFull = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}.`;

const fmtMoney = (n: number, curr: string) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;

export const exportRoomresBill = async (req: Request, res: Response) => {
  if (!req.body.id) return res.status(404).json({ message: "Id not provided" });

  const rawRoomres = await RoomReservation.findById(req.body.id)
    .populate("guest")
    .populate("assignedRoom");

  if (!rawRoomres)
    return res.status(404).json({ message: "Room reservation not found" });

  const parsed = roomReservationSchema.safeParse(rawRoomres);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }
  const roomres = parsed.data;

  const rawTaxes = await Taxes.findOne({ _id: "taxes" });
  if (!rawTaxes) return res.status(404).json({ message: "Taxes not found" });
  const parsedTaxes = taxesSchema.safeParse(rawTaxes);
  if (!parsedTaxes.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsedTaxes.error.issues });
  }
  const taxes = parsedTaxes.data;

  const curr = roomres.currency;
  const days = Math.floor(
    (roomres.endDate.getTime() - roomres.startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const roomTypeTrans = roomTypeTranslations[roomres.assignedRoom.type] ?? {
    srb: roomres.assignedRoom.type,
    eng: roomres.assignedRoom.type,
  };
  const bedNumTrans = bedNumTranslations[roomres.assignedRoom.bednum] ?? {
    srb: roomres.assignedRoom.bednum,
    eng: roomres.assignedRoom.bednum,
  };

  type LineItem = {
    nameSrb: string;
    nameEng: string;
    unit: number;
    qty: number;
    total: number;
  };
  const lines: LineItem[] = [];

  lines.push({
    nameSrb: `Soba ${roomres.assignedRoom.roomnum}`,
    nameEng: `Room ${roomres.assignedRoom.roomnum}`,
    unit: roomres.rate,
    qty: days,
    total: roomres.rate * days,
  });

  const taxAdTotal = taxes.touristTaxAd * days * roomres.adults;
  lines.push({
    nameSrb: "Boravišna taksa (odrasli)",
    nameEng: "Tourist tax (adults)",
    unit: taxes.touristTaxAd,
    qty: days * roomres.adults,
    total: taxAdTotal,
  });

  if (roomres.children > 0) {
    const taxChTotal = taxes.touristTaxCh * days * roomres.children;
    lines.push({
      nameSrb: "Boravišna taksa (deca)",
      nameEng: "Tourist tax (children)",
      unit: taxes.touristTaxCh,
      qty: days * roomres.children,
      total: taxChTotal,
    });
  }

  const grandTotal = lines.reduce((s, l) => s + l.total, 0);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = `
    <html>
    <head>
      <style>
        ${styles}
      </style>
    </head>
    <body>

      <div class="header">
        <div class="header-left">
          <h1>Hotel</h1>
          <p>Račun za rezervaciju / Reservation Bill</p>
        </div>
        <div class="header-right">
          <div class="bill-label">Račun / Bill</div>
          <div class="bill-date">
            ${fmtFull(roomres.startDate)} — ${fmtFull(roomres.endDate)}<br/>
            ${days} ${days === 1 ? "noć / night" : "noći / nights"}
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box">
          <h3>Gost / Guest</h3>
          <p><span class="label">Ime / Name:</span> ${roomres.guest.fName} ${roomres.guest.lName}</p>
          <p><span class="label">Email:</span> ${roomres.guest.email}</p>
          <p><span class="label">Adresa / Address:</span> ${roomres.guest.address}</p>
        </div>
        <div class="info-box">
          <h3>Soba / Room</h3>
          <p><span class="label">Broj sobe / Room number:</span> ${roomres.assignedRoom.roomnum}</p>
          <p><span class="label">Tip / Type:</span> ${roomTypeTrans.srb} / ${roomTypeTrans.eng}</p>
          <p><span class="label">Krevet / Bed:</span> ${bedNumTrans.srb} / ${bedNumTrans.eng}</p>
          <p><span class="label">Odrasli / Adults:</span> ${roomres.adults}</p>
          ${roomres.children > 0 ? `<p><span class="label">Deca / Children:</span> ${roomres.children}</p>` : ""}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Stavka / Item</th>
            <th>Cena / Unit Price</th>
            <th>Količina / Quantity</th>
            <th>Ukupno / Total</th>
          </tr>
        </thead>
        <tbody>
          ${lines
            .map(
              (l, i) => `
            <tr>
              <td>${i + 1}</td>
              <td class="item-name">
                <span class="srb">${l.nameSrb}</span><br/>
                <span class="eng">${l.nameEng}</span>
              </td>
              <td>${fmtMoney(l.unit, curr)}</td>
              <td>${l.qty}</td>
              <td>${fmtMoney(l.total, curr)}</td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-box">
          <div class="total-row grand">
            <span>Ukupno / Total</span>
            <span class="amount">${fmtMoney(grandTotal, curr)}</span>
          </div>
          <div class="total-row grand">
            <span>Status plaćanja / Payment</span>
            <span class="amount">${roomres.paid ? "Plaćeno / Paid" : "Nije plaćeno / Unpaid"}</span>
          </div>
          <div class="total-row grand">
            <span>Datum / Date:</span>
            <span class="amount">${roomres.paidDate ? fmtFull(roomres.paidDate) : "/"}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        Dokument generisan / Document generated: ${fmtFull(new Date())} &bull; Reservation ID: ${roomres._id}
      </div>

    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px", left: "0px", right: "0px" },
  });

  await browser.close();

  const fileName = `reservation bill ${fmt(roomres.startDate)} - ${fmt(roomres.endDate)}.pdf`;

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${fileName}"`,
  });

  res.send(pdf);
};
