import items from "./items";


export default function getItems({router}){
	const invoiceItems = items.getInvoiceItems({router});
	const customerItems = items.getCustomersItems({router});
	const offerItems = items.getOfferItems({router});
	const settingItems = items.getSettingsItems({router});
	const dashboardItems = items.getDashboardItems({router});

	return [
		dashboardItems,
		customerItems,
		invoiceItems,
		offerItems,
		settingItems,
	];
};
