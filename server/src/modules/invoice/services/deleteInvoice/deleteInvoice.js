const models = require("../../models");
const rules = require("./rules");
const storage = require("./storage");
const path = require("path");


module.exports = async ({ userId, invoiceNumber }) => {
  const invoice = await models.getInvoiceByInvoiceNumber({
    userId,
    invoiceNumber,
  });

  if (!invoice) {
    const error = new Error("Rechnung nicht gefunden.");
    error.status = 404;

    throw error;
  }

  // is delete invoice allowed?
  if (!rules.isDeleteInvoiceAllowed(invoice.status)) {
    const error = new Error("Löschen einer Rechnung ist nur bei dem Status Entwurf erlaubt.");
    error.status = 409;

    throw error;
  }

  // delete possible pdf
  const pdfDocument = await models.getDocumentByInvoiceId({
    userId,
    invoiceId: invoice._id,
    type: "pdf",
  });

  if (pdfDocument) {
    const pdfFilePath = path.join(process.cwd(), "storage/documents", pdfDocument.storageKey);

    await storage.deletePdfFromStorage(pdfFilePath)
    await models.deleteDocument({
      userId,
      invoiceId: invoice._id,
      type: "pdf",
    });
  }

  // delete invoice
  const result = await models.deleteInvoice({
    userId,
    invoiceNumber,
  })

  if (result.deletedCount === 0) {
    const error = new Error("Rechnung konnte nicht gelöscht werden.")
    error.status = 404;

    throw error;
  }
}
