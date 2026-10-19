const router = require("express").Router();
const controller = require("./controller");
const { authUser } = require("../../middlewares");

router.get("/", authUser, controller.getDashboard);

module.exports = router;
