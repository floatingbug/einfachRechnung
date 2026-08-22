const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");
const { authUser } = require("../../middlewares");


// TODO: impolement validators
router.post("/", authUser, controller.createInvoice);

router.get("/", authUser, controller.getInvoices);

router.get(
	"/by-invoice-number/:invoiceNumber",
	authUser,
	controller.getInvoiceByInvoiceNumber
);

router.get(
	"/:invoiceId",
	controller.getInvoiceById
);

router.patch(
	"/:invoiceId/send",
	controller.sendInvoice
);

router.patch(
	"/:invoiceId/cancel",
	controller.cancelInvoice
);

router.post(
	"/:invoiceId/payments",
	controller.addPaymentToInvoice
);

router.get(
	"/:invoiceId/export-xrechnung",
	controller.exportXInvoice
);


module.exports = router;
