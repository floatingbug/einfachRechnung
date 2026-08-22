const models = require("../models");
const {mapToClientInvoice} = require("../mappers");


module.exports = async ({invoiceNumber, userId}) => {
    const invoice = await models.getInvoiceByInvoiceNumber({
        userId,
        invoiceNumber,
    })

    if(!invoice){
        throw new Error("Rechnung konnte nicht geladen werden.")
    }

    return mapToClientInvoice(invoice);
}
