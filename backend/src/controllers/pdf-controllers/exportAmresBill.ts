import { type Request, type Response } from "express";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { AmenityReservation } from "../../models/AmenityReservation.ts";
import { amenityReservationSchema } from "../../schemas/amenityReservation.response.schema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const styles = readFileSync(join(__dirname, "style.css"), "utf-8");

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;

const fmtFull = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}.`;

const fmtTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const fmtMoney = (n: number, curr: string) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;

export const amenityTypeTranslations: Record<
  string,
  { srb: string; eng: string }
> = {
  conference: { srb: "Konferencijska sala", eng: "Conference room" },
  spa: { srb: "Spa", eng: "Spa" },
  pool: { srb: "Bazen", eng: "Pool" },
  restaurant: { srb: "Restoran", eng: "Restaurant" },
  gym: { srb: "Teretana", eng: "Gym" },
  sauna: { srb: "Sauna", eng: "Sauna" },
};

export const exportAmresBill = async (req: Request, res: Response) => {
  if (!req.body.id) return res.status(404).json({ message: "Id not provided" });

  const rawAmres = await AmenityReservation.findById(req.body.id)
    .populate("amenity")
    .populate("guest");

  if (!rawAmres)
    return res.status(404).json({ message: "Amenity reservation not found" });

  const parsed = amenityReservationSchema.safeParse(rawAmres);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }
  const amres = parsed.data;

  const curr = amres.currency;
  const amenityTypeTrans = amenityTypeTranslations[amres.amenity.type] ?? {
    srb: amres.amenity.type,
    eng: amres.amenity.type,
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
    nameSrb: amres.amenity.name,
    nameEng: amres.amenity.name,
    unit: amres.rate,
    qty: 1,
    total: amres.rate,
  });

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
          <p>Račun za rezervaciju dodatne pogodnosti / Amenity Reservation Bill</p>
        </div>
        <div class="header-right">
          <div class="bill-label">Račun / Bill</div>
          <div class="bill-date">
            ${fmtFull(amres.startTime)}<br/>
            ${fmtTime(amres.startTime)} — ${fmtTime(amres.endTime)}
          </div>
        </div>
      </div>

      <div class="info-grid">
        ${
          amres.guest
            ? `
        <div class="info-box">
          <h3>Gost / Guest</h3>
          <p><span class="label">Ime / Name:</span> ${amres.guest.fName} ${amres.guest.lName}</p>
          <p><span class="label">Email:</span> ${amres.guest.email}</p>
          <p><span class="label">Adresa / Address:</span> ${amres.guest.address}</p>
        </div>
        `
            : `<div class="info-box"></div>`
        }
        <div class="info-box">
          <h3>Sadržaj / Amenity</h3>
          <p><span class="label">Naziv / Name:</span> <span class="value">${amres.amenity.name}</span></p>
          <p><span class="label">Tip / Type:</span> <span class="value">${amenityTypeTrans.srb} / ${amenityTypeTrans.eng}</span></p>
          <p><span class="label">Br. osoba / People:</span> <span class="value">${amres.numberOfPeople}</span></p>
          <p><span class="label">Vreme / Time:</span> <span class="value">${fmtTime(amres.startTime)} — ${fmtTime(amres.endTime)}</span></p>
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
                <span class="srb">${l.nameSrb}</span>
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
            <span class="amount">${amres.paid ? "Plaćeno / Paid" : "Nije plaćeno / Unpaid"}</span>
          </div>
          <div class="total-row grand">
            <span>Datum / Date:</span>
            <span class="amount">${amres.paidDate ? fmtFull(amres.paidDate) : "/"}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        Dokument generisan / Document generated: ${fmtFull(new Date())} &bull; Reservation ID: ${amres._id}
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

  const fileName = `amenity bill ${fmt(amres.startTime)}.pdf`;

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${fileName}"`,
  });

  res.send(pdf);
};
