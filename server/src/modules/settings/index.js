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


module.exports = router;
