const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");
const validator = require("./middlewares/validator");


router.get(
    "/",
    authUser,
    controller.getCustomers
);

router.get(
    "/:customerId",
    authUser,
    controller.getCustomerById
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


module.exports = router;
