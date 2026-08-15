const getSettings = require("./getSettings");
const updateCompany = require("./updateCompany");
const updateInvoice = require("./updateInvoice");
const updateTax = require("./updateTax");
const updateEmail = require("./updateEmail");
const updateOffer = require("./updateOffer");
const incNextOfferNumber = require("./incNextOfferNumber");
const createDefaultSettings = require("./createDefaultSettings");


module.exports = {
    getSettings,
    updateCompany,
    updateInvoice,
    updateTax,
    updateEmail,
    updateOffer,
    incNextOfferNumber,
    createDefaultSettings,
};
