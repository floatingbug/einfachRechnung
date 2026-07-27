const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");
const {validateCompany} = require("./middlewares");


router.get(
    "/:type",
    authUser,
    controller.getSettings
);

router.put(
    "/company", 
    authUser, 
    validateCompany, 
    controller.updateCompany
);

// TODO invoice validator

router.put(
    "/invoice", 
    authUser, 
    controller.updateInvoice
);

// TODO tax validator

router.put(
    "/tax", 
    authUser, 
    controller.updateTax
);

// TODO email validator

router.put(
    "/email", 
    authUser, 
    controller.updateEmail
);

// TODO offer validator

router.put(
    "/offer", 
    authUser, 
    controller.updateOffer
);


module.exports = router;
