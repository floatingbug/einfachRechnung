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


module.exports = router;
