export default function createInvoiceEntity({invoiceSettings, taxSettings}){
	const date = new Date();
	const dueDate = new Date();
	dueDate.setDate(date.getDate() + invoiceSettings.dueDays);
	const invoiceDate = date;

	const invoice = {
		taxNumber: invoiceSettings.taxNumber,
		invoiceDate,
		dueDate,
		serviceDate: date,
		paymentMethod: invoiceSettings.paymentMethod ?? "bankTransfer",
		vatId: invoiceSettings.vatId,
		items: [],
		note: "",
		reverseChargeEnabled: taxSettings.reverseChargeEnabled ?? false,
		vatMode: taxSettings.vatMode ?? "",
		taxTreatment: "standard",
	};

	return invoice;
}
