const router = require("express").Router();
const controller = require("./controller");


router.get(
    "/",
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
