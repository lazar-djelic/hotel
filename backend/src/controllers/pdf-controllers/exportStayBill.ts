import { type Request, type Response } from "express";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Stay } from "../../models/Stay.ts";
import { staySchema } from "../../schemas/stay.response.schema.ts";
import Taxes from "../../models/Taxes.ts";
import { taxesSchema } from "../../schemas/taxes.schema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const styles = readFileSync(join(__dirname, "style.css"), "utf-8");

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;

const fmtFull = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}.`;

const fmtMoney = (n: number, curr: string) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${curr}`;

export const roomTypeTranslations: Record<
  string,
  { srb: string; eng: string }
> = {
  standard: { srb: "Standardna", eng: "Standard" },
  deluxe: { srb: "Deluks", eng: "Deluxe" },
  suite: { srb: "Apartman", eng: "Suite" },
  penthouse: { srb: "Penthaus", eng: "Penthouse" },
};

export const bedNumTranslations: Record<string, { srb: string; eng: string }> =
  {
    single: { srb: "Pojedinačni", eng: "Single" },
    double: { srb: "Bračni", eng: "Double" },
    twin: { srb: "Dva odvojena kreveta", eng: "Twin beds" },
  };

export const exportStayBill = async (req: Request, res: Response) => {
  if (!req.body.id) return res.status(404).json({ message: "Id not provided" });

  const rawStay = await Stay.findById(req.body.id)
    .populate("guest")
    .populate("reservation")
    .populate("room")
    .populate("extras.extra");

  if (!rawStay) return res.status(404).json({ message: "Stay not found" });

  const parsed = staySchema.safeParse(rawStay);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }
  const stay = parsed.data;

  const rawTaxes = await Taxes.findOne({ _id: "taxes" });
  if (!rawTaxes) return res.status(404).json({ message: "Taxes not found" });
  const parsedTaxes = taxesSchema.safeParse(rawTaxes);
  if (!parsedTaxes.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsedTaxes.error.issues });
  }
  const taxes = parsedTaxes.data;

  const curr = stay.currency;

  const checkInMidnight = new Date(stay.checkIn);
  checkInMidnight.setUTCHours(0, 0, 0, 0);
  const checkOutMidnight = new Date(stay.checkOut);
  checkOutMidnight.setUTCHours(0, 0, 0, 0);

  const days = Math.floor(
    (checkOutMidnight.getTime() - checkInMidnight.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const roomTypeTrans = roomTypeTranslations[stay.room.type] ?? {
    srb: stay.room.type,
    eng: stay.room.type,
  };
  const bedNumTrans = bedNumTranslations[stay.room.bednum] ?? {
    srb: stay.room.bednum,
    eng: stay.room.bednum,
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
    nameSrb: `Soba ${stay.room.roomnum}`,
    nameEng: `Room ${stay.room.roomnum}`,
    unit: stay.rate,
    qty: days,
    total: stay.rate * days,
  });

  const taxAdTotal = taxes.touristTaxAd * days * stay.adults;
  lines.push({
    nameSrb: "Boravišna taksa (odrasli)",
    nameEng: "Tourist tax (adults)",
    unit: taxes.touristTaxAd,
    qty: days * stay.adults,
    total: taxAdTotal,
  });

  if (stay.children > 0) {
    const taxChTotal = taxes.touristTaxCh * days * stay.children;
    lines.push({
      nameSrb: "Boravišna taksa (deca)",
      nameEng: "Tourist tax (children)",
      unit: taxes.touristTaxCh,
      qty: days * stay.children,
      total: taxChTotal,
    });
  }

  for (const e of stay.extras) {
    lines.push({
      nameSrb: e.extra.nameSrb,
      nameEng: e.extra.nameEng,
      unit: e.extra.price,
      qty: e.amount,
      total: e.extra.price * e.amount,
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
          <h1>Sapphire Hotel</h1>
          <p>Račun za boravak / Stay Bill</p>
        </div>
        <div class="header-right">
          <div class="bill-label">Račun / Bill</div>
          <div class="bill-date">
            ${fmtFull(stay.checkIn)} — ${fmtFull(stay.checkOut)}<br/>
            ${days} ${days === 1 ? "noć / night" : "noći / nights"}
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box">
          <h3>Gost / Guest</h3>
          <p><span class="label">Ime / Name:</span> ${stay.guest.fName} ${stay.guest.lName}</p>
          <p><span class="label">Email:</span> ${stay.guest.email}</p>
          <p><span class="label">Adresa / Address:</span> ${stay.guest.address}</p>
        </div>
        <div class="info-box">
          <h3>Soba / Room</h3>
          <p><span class="label">Broj sobe / Room number:</span> ${stay.room.roomnum}</p>
          <p><span class="label">Tip / Type:</span> ${roomTypeTrans.srb} / ${roomTypeTrans.eng}</p>
          <p><span class="label">Krevet / Bed:</span> ${bedNumTrans.srb} / ${bedNumTrans.eng}</p>
          <p><span class="label">Odrasli / Adults:</span> ${stay.adults}</p>
          ${stay.children > 0 ? `<p><span class="label">Deca / Children:</span> ${stay.children}</p>` : ""}
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
            <span class="amount">${stay.paid ? "Plaćeno / Paid" : "Nije plaćeno / Unpaid"}</span>
          </div>
          <div class="total-row grand">
            <span>Datum / Date:</span>
            <span class="amount">${stay.paidDate ? fmtFull(stay.paidDate) : "/"}</span>
          </div>
        </div>
      </div>

      ${
        stay.notes
          ? `
      <div class="info-box" style="margin-bottom:20px;">
        <h3>Napomene / Notes</h3>
        <p>${stay.notes}</p>
      </div>
      `
          : ""
      }

      <div class="footer">
        Dokument generisan / Document generated: ${fmtFull(new Date())} &bull; Stay ID: ${stay._id}
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

  const fileName = `stay bill ${fmt(stay.checkIn)} - ${fmt(stay.checkOut)}.pdf`;

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${fileName}"`,
  });

  res.send(pdf);
};
