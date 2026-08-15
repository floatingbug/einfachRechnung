const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");


router.get(
    "/",
    authUser,
    controller.getOffers
);

// TODO: item.id to item._id (ObjectId) in validation
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

module.exports = router;
