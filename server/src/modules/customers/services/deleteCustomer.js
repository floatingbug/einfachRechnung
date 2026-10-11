const models = require("../models");
const { deletePdfFile } = require("../../../storage");
const { handleError } = require("../../../utils");


module.exports = async ({ userId, customerId }) => {
  // --- deletion rules --- //
  // has customer only documents with status draft?
  const invoicesCursor = models.getInvoicesCursor({
    customerId,
  })
  const offersCursor = models.getOffersCursor({
    customerId,
  })

  for await (const invoice of invoicesCursor) {
    if (!(invoice.status === "draft" || invoice.status === "canceled")) {
      handleError({
        message: "Kunden mit Rechungen können nur gelöscht werden, wenn diese im Status Entwurf oder storniert sind.",
        status: 400
      });
    }
  }

  for await (const offer of offersCursor) {
    if (!(offer.status === "draft" || offer.status === "canceled")) {
      handleError({
        message: "Kunden mit Angeboten können nur gelöscht werden, wenn diese im Status Entwurf oder storniert sind.",
        status: 400
      });
    }
  }

  // --- delete pdfs and documents --- //
  const documentsCursor = models.getCustomersDocuments({
    customerId,
  });

  for await (const doc of documentsCursor) {
    await deletePdfFile({
      storageKey: doc.storageKey,
    });

    await models.deleteDocument({
      documentId: doc._id,
    });
  }


  // --- delete customer --- //
  const result = await models.deleteCustomer({
    userId,
    customerId,
  });

  return result;
};
