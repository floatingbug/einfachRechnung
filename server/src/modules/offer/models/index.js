const saveOffer = require("./saveOffer");
const getOffers = require("./getOffers");
const getOfferByOfferNumber = require("./getOfferByOfferNumber");
const updateOffer = require("./updateOffer");
const deleteOffer = require("./deleteOffer");

const createDocument = require("./createDocument");
const getDocumentByOfferNumber = require("./getDocumentByOfferNumber");
const updateDocument = require("./updateDocument");


module.exports = {
    saveOffer,
    getOffers,
    getOfferByOfferNumber,
    updateOffer,
    deleteOffer,

    createDocument,
    getDocumentByOfferNumber,
    updateDocument,
};
