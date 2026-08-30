const saveOffer = require("./saveOffer");
const getOffers = require("./getOffers");
const getOfferByOfferNumber = require("./getOfferByOfferNumber");
const updateOffer = require("./updateOffer");
const deleteOffer = require("./deleteOffer");

const createDocument = require("./createDocument");
const getDocumentByOfferId = require("./getDocumentByOfferId.js");
const updateDocument = require("./updateDocument");
const deleteDocument = require("./deleteDocument");


module.exports = {
    saveOffer,
    getOffers,
    getOfferByOfferNumber,
    updateOffer,
    deleteOffer,

    createDocument,
    getDocumentByOfferId,
    updateDocument,
    deleteDocument,
};
