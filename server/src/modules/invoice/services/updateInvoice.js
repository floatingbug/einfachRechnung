const models = require("../models");


module.exports = async ({userId, invoiceNumber, invoiceDraft}) => {
    const result = await models.updateInvoice({
        userId,
        invoiceNumber,
        invoiceDraft,
    })

    if(result.modifiedCount === 0){
        throw new Error("Rechnung konnte nicht geändert werden. Bitte versuchen sie es erneut.")
    }

    const invoice = await models.getInvoiceByInvoiceNumber({
        invoiceNumber,
    });

    return invoice;
}
