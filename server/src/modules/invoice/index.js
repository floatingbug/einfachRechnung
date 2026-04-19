const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");


router.post("/", validator.create, controller.create);
router.get("/", validator.findMany, controller.findMany);
router.get("/:invoiceId", validator.findById, controller.findById);
router.patch("/:invoiceId/send", validator.send, controller.send);
router.patch("/:invoiceId/cancel", validator.cancel, controller.cancel);
router.post("/:invoiceId/payments", validator.addPayment, controller.addPayment);
router.get("/:invoiceId/export-xrechnung", validator.exportXrechnung, controller.exportXrechnung);


module.exports = router;
