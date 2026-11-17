const settingsModels = require("../../settings/models");
const {formatDocumentNumber} = require("../../../utils");

const DEFAULT_FORMAT = "{prefix}{year}-{number}";


// Reserves the next invoice number and formats it with the configured pattern.
module.exports = async ({userId, date = new Date()}) => {
    const nextNumber = await settingsModels.incNextInvoiceNumber({userId});
    const invoiceSettings = await settingsModels.getSettings({
        userId,
        type: "invoice",
    });

    return formatDocumentNumber({
        format: invoiceSettings?.invoiceNumberFormat || DEFAULT_FORMAT,
        prefix: invoiceSettings?.invoicePrefix ?? "",
        number: nextNumber,
        date,
    });
}
