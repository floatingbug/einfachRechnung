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
	"/:invoiceNumber",
    authUser,
	controller.getInvoiceById
);

router.patch(
    "/:invoiceNumber",
    authUser,
    controller.updateInvoice
);

router.patch(
	"/send/:invoiceNumber",
    authUser,
	controller.sendInvoice
);

router.patch(
	"/cancel/:invoiceNumber",
    authUser,
	controller.cancelInvoice
);

router.post(
	"/payments/:invoiceNmber",
    authUser,
	controller.addPaymentToInvoice
);

router.get(
	"/export-xrechnung/:invoiceNumber",
    authUser,
	controller.exportXInvoice
);

router.get(
    "/pdf/:invoiceNumber",
    authUser,
    controller.getPdf
);


module.exports = router;
