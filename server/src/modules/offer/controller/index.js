const saveOffer = require("./saveOffer");
const getOfferTemplate = require("./getOfferTemplate");
const getOffers = require("./getOffers");
const getOfferByOfferNumber = require("./getOfferByOfferNumber");
const updateOffer = require("./updateOffer");
const getPdf = require("./getPdf");
const deleteOffer = require("./deleteOffer");


module.exports = {
    getOfferTemplate,
    saveOffer,
    getOffers,
    getOfferByOfferNumber,
    updateOffer,

    getPdf,
    deleteOffer,
};
