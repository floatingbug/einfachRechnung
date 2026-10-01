const { calculateTotals, calculateOpenAmount } = require("../../../utils");
const models = require("../models");


module.exports = async ({userId, invoiceNumber, invoiceDraft}) => {
    const updatedTotals = calculateTotals(invoiceDraft.items);

    const {totals, ...invoice} = invoiceDraft;
    invoice.totals = updatedTotals;
    invoice.payment.openAmount = calculateOpenAmount({
        payments: invoice.payment.payments,
        totalGross: updatedTotals.totalGross,
    });

    const result = await models.updateInvoice({
        userId,
        invoiceNumber,
        invoice,
    })

    if(result.modifiedCount === 0){
        throw new Error("Rechnung konnte nicht geändert werden. Bitte versuchen sie es erneut.")
    }

    return invoice;
}
