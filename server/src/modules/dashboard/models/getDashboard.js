const { getDb, ObjectId } = require("../../../db/mongo");

// --- Konfiguration: bei abweichenden Status-Werten anpassen -----------------
const EXCLUDED_INVOICE_STATUSES = ["draft", "cancelled"]; // zählen nicht in Umsatz/Forderungen
const OPEN_OFFER_STATUSES = ["sent"]; // Angebote, die beim Kunden liegen
const TIMEZONE = "Europe/Berlin";
const CHART_MONTHS = 12;
const RECENT_LIMIT = 5;

// --- Helfer -------------------------------------------------------------------
const sumIf = (cond, field) => ({ $sum: { $cond: [cond, field, 0] } });
const countIf = (cond) => ({ $sum: { $cond: [cond, 1, 0] } });
const inRange = (field, from, to) => ({
  $and: [{ $gte: [field, from] }, { $lt: [field, to] }],
});

const monthStart = (date, offset = 0) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);
const quarterStart = (date) =>
  new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);

const customerName = (c = {}) =>
  c.companyName || [c.firstName, c.lastName].filter(Boolean).join(" ");

// Monate ohne Rechnungen mit 0 auffüllen, damit das Diagramm lückenlos ist
const fillMonths = (rows, from, count) => {
  const byMonth = new Map(rows.map((r) => [r._id, r]));
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const row = byMonth.get(key);
    return {
      month: key,
      invoicedGross: row?.invoicedGross ?? 0,
      paidGross: row?.paidGross ?? 0,
    };
  });
};

// --- Hauptfunktion ------------------------------------------------------------
module.exports = async ({ userId }) => {
  const db = getDb();
  const invoices = db.collection("invoices");
  const offers = db.collection("offers");

  const uid = new ObjectId(userId);
  const now = new Date();
  const thisMonth = monthStart(now);
  const nextMonth = monthStart(now, 1);
  const prevMonth = monthStart(now, -1);
  const chartFrom = monthStart(now, -(CHART_MONTHS - 1));
  const quarterFrom = quarterStart(now);

  const issued = { userId: uid, status: { $nin: EXCLUDED_INVOICE_STATUSES } };
  const hasOpenAmount = { $gt: ["$payment.openAmount", 0] };
  const isOverdue = { $and: [hasOpenAmount, { $lt: ["$dueDate", now] }] };

  const [
    [invoiceKpis = {}],
    revenueRows,
    statusRows,
    [openOffers = {}],
    recentInvoiceDocs,
    recentOfferDocs,
  ] = await Promise.all([
    // 1) Kennzahlen aus Rechnungen
    invoices
      .aggregate([
        { $match: issued },
        {
          $group: {
            _id: null,
            revenueNetMonth: sumIf(inRange("$invoiceDate", thisMonth, nextMonth), "$totals.totalNet"),
            revenueNetPreviousMonth: sumIf(inRange("$invoiceDate", prevMonth, thisMonth), "$totals.totalNet"),
            openAmount: sumIf(hasOpenAmount, "$payment.openAmount"),
            openInvoiceCount: countIf(hasOpenAmount),
            overdueAmount: sumIf(isOverdue, "$payment.openAmount"),
            overdueInvoiceCount: countIf(isOverdue),
            vatQuarter: sumIf({ $gte: ["$invoiceDate", quarterFrom] }, "$totals.totalTax"),
          },
        },
      ])
      .toArray(),

    // 2) Umsatz pro Monat (Diagramm)
    invoices
      .aggregate([
        { $match: { ...issued, invoiceDate: { $gte: chartFrom } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$invoiceDate", timezone: TIMEZONE } },
            invoicedGross: { $sum: "$totals.totalGross" },
            paidGross: { $sum: "$payment.paidAmount" },
          },
        },
      ])
      .toArray(),

    // 3) Zahlungsstatus (jede Rechnung genau einer Kategorie zugeordnet)
    invoices
      .aggregate([
        { $match: issued },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $eq: ["$payment.status", "paid"] }, then: "paid" },
                  { case: isOverdue, then: "overdue" },
                  { case: { $gt: ["$payment.paidAmount", 0] }, then: "partial" },
                ],
                default: "unpaid",
              },
            },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray(),

    // 4) Offene Angebote
    offers
      .aggregate([
        {
          $match: {
            userId: uid,
            status: { $in: OPEN_OFFER_STATUSES },
            validUntil: { $gte: now },
          },
        },
        { $group: { _id: null, count: { $sum: 1 }, volumeNet: { $sum: "$totalNet" } } },
      ])
      .toArray(),

    // 5) Letzte Rechnungen (inkl. Entwürfe)
    invoices
      .find(
        { userId: uid },
        {
          projection: {
            invoiceNumber: 1,
            invoiceDate: 1,
            dueDate: 1,
            status: 1,
            customer: 1,
            "totals.totalGross": 1,
            "payment.status": 1,
            "payment.openAmount": 1,
          },
        }
      )
      .sort({ invoiceDate: -1 })
      .limit(RECENT_LIMIT)
      .toArray(),

    // 6) Letzte Angebote
    offers
      .find(
        { userId: uid },
        {
          projection: {
            offerNumber: 1,
            offerDate: 1,
            validUntil: 1,
            status: 1,
            customerName: 1,
            totalGross: 1,
          },
        }
      )
      .sort({ offerDate: -1 })
      .limit(RECENT_LIMIT)
      .toArray(),
  ]);

  const paymentStatus = { paid: 0, partial: 0, unpaid: 0, overdue: 0 };
  for (const row of statusRows) paymentStatus[row._id] = row.count;

  return {
    kpis: {
      revenueNetMonth: invoiceKpis.revenueNetMonth ?? 0,
      revenueNetPreviousMonth: invoiceKpis.revenueNetPreviousMonth ?? 0,
      openAmount: invoiceKpis.openAmount ?? 0,
      openInvoiceCount: invoiceKpis.openInvoiceCount ?? 0,
      overdueAmount: invoiceKpis.overdueAmount ?? 0,
      overdueInvoiceCount: invoiceKpis.overdueInvoiceCount ?? 0,
      openOfferCount: openOffers.count ?? 0,
      openOfferVolumeNet: openOffers.volumeNet ?? 0,
      vatQuarter: invoiceKpis.vatQuarter ?? 0,
    },
    revenueByMonth: fillMonths(revenueRows, chartFrom, CHART_MONTHS),
    paymentStatus,
    recentInvoices: recentInvoiceDocs.map((inv) => ({
      id: inv._id,
      invoiceNumber: inv.invoiceNumber,
      customerName: customerName(inv.customer),
      invoiceDate: inv.invoiceDate,
      dueDate: inv.dueDate,
      totalGross: inv.totals?.totalGross ?? 0,
      status: inv.status,
      paymentStatus: inv.payment?.status,
      isOverdue:
        !EXCLUDED_INVOICE_STATUSES.includes(inv.status) &&
        (inv.payment?.openAmount ?? 0) > 0 &&
        inv.dueDate < now,
    })),
    recentOffers: recentOfferDocs.map((o) => ({
      id: o._id,
      offerNumber: o.offerNumber,
      customerName: o.customerName,
      offerDate: o.offerDate,
      validUntil: o.validUntil,
      totalGross: o.totalGross ?? 0,
      status: o.status,
    })),
  };
};
