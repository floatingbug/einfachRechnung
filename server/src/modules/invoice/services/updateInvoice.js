const { calculateTotals, calculateOpenAmount } = require("../../../utils");
const models = require("../models");

const PLAIN_FIELDS = ["taxTreatment", "currency", "note"];
const DATE_FIELDS = ["invoiceDate", "dueDate", "serviceDate"];

const httpError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const toDate = (value, field) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) {
    throw httpError(`Ungültiges Datum: ${field}`, 400);
  }
  return date;
};

module.exports = async ({ userId, invoiceNumber, invoiceDraft }) => {
  // Annahme: Model-Name anpassen, falls er bei dir anders heißt
  const existing = await models.getInvoiceByInvoiceNumber({
    userId,
    invoiceNumber,
  });

  if (!existing) {
    throw httpError("Rechnung nicht gefunden", 404);
  }

  // Optional: versendete Rechnungen nicht mehr ändern (GoBD)
  if (existing.status !== "draft") {
    throw httpError("Nur Entwürfe können bearbeitet werden", 409);
  }

  // Nur Felder übernehmen, die im Payload vorkommen UND erlaubt sind
  const invoice = {};

  for (const field of PLAIN_FIELDS) {
    if (invoiceDraft[field] !== undefined) {
      invoice[field] = invoiceDraft[field];
    }
  }

  for (const field of DATE_FIELDS) {
    if (invoiceDraft[field] !== undefined) {
      invoice[field] = toDate(invoiceDraft[field], field);
    }
  }

  // Summen und offener Betrag nur neu berechnen, wenn Positionen geschickt wurden
  if (invoiceDraft.items !== undefined) {
    const totals = calculateTotals(invoiceDraft.items);

    invoice.items = invoiceDraft.items;
    invoice.totals = totals;
    invoice["payment.openAmount"] = calculateOpenAmount({
      payments: existing.payment.payments, // aus der DB, nicht vom Client
      totalGross: totals.totalGross,
    });
  }

  if (invoiceDraft.payment?.method !== undefined) {
    invoice["payment.method"] = invoiceDraft.payment.method;
  }

  invoice.updatedAt = new Date();

  const result = await models.updateInvoice({
    userId,
    invoiceNumber,
    invoice,
  });

  if (result.matchedCount === 0) {
    throw httpError("Rechnung nicht gefunden", 404);
  }

  return invoice;
};
