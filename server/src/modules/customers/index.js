const router = require("express").Router();
const controller = require("./controller");
const {authUser} = require("../../middlewares");


router.get(
    "/",
    authUser,
    controller.getCustomers,
);

router.post(
    "/",
    controller.createCustomer,
);

router.patch(
    "/",
    controller.updateCustomer,
);


module.exports = router;
