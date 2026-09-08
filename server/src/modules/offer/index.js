const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");

const rateLimit = require('express-rate-limit');
const config = require("../../config");

const changeStatusLimit = config.env === "production"
    ? rateLimit(config.rateLimitConfig.statusChange)
    : (req, res, next) => next();


router.get(
    "/",
    authUser,
    controller.getOffers
);

router.post(
    "/",
    authUser,
    controller.saveOffer
);

router.get(
    "/offer-template",
    authUser,
    controller.getOfferTemplate
);

router.get(
    "/:offerNumber",
    authUser,
    controller.getOfferByOfferNumber
);

router.patch(
    "/",
    authUser,
    controller.updateOffer
);

router.patch(
    "/change-status/:offerNumber",
    authUser,
    changeStatusLimit,
    controller.changeStatus
);

router.get(
    "/:offerNumber/pdf",
    authUser,
    controller.getPdf
);

router.delete(
    "/:offerNumber",
    authUser,
    controller.deleteOffer
);

router.post(
    "/convert-to-invoice/:offerNumber",
    authUser,
    controller.convertToInvoice
);

module.exports = router;
