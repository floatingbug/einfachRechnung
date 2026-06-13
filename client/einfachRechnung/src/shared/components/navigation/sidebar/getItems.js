import items from "./items";


export default function getItems({router}){
	const invoiceItems = items.getInvoiceItems({router});
	const customerItems = items.getCustomersItems({router});
	const offerItems = items.getOfferItems({router});
	const paymentItems = items.getPaymentItems({router});
	const settingItems = items.getSettingsItems({router});

	return [
		invoiceItems,
		customerItems,
		offerItems,
		paymentItems,
		settingItems,
	];
};
