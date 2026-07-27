const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");


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


module.exports = router;
