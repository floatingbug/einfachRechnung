const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");


router.get(
    "/",
    authUser,
    controller.getCustomers
);

router.post(
    "/",
    authUser,
    controller.createCustomer
);

router.patch(
    "/",
    authUser,
    controller.updateCustomer
);

router.get(
    "/get-customer-template",
    authUser,
    controller.getCustomerTemplate
);


module.exports = router;
