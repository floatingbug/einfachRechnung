const mapToClientInvoice = require("./mapToClientInvoice.js");


module.exports = (invoices) => {
    const mappedInvoices = invoices.map(invoice => {
        return mapToClientInvoice(invoice);
    });

    return mappedInvoices;
}
