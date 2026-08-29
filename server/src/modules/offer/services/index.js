const getOfferTemplate = require("./getOfferTemplate");
const saveOffer = require("./saveOffer");
const getOffers = require("./getOffers");
const getOfferByOfferNumber = require("./getOfferByOfferNumber");
const updateOffer = require("./updateOffer");
const deleteOffer = require("./deleteOffer");

const getPdf = require("./getPdf");
const createOfferPdf = require("./createOfferPdf");

const convertToInvoice = require("./convertToInvoice");


module.exports = {
    getOfferTemplate,
    saveOffer,
    getOffers,
    getOfferByOfferNumber,
    updateOffer,
    deleteOffer,

    getPdf,
    createOfferPdf,

    convertToInvoice,
};
