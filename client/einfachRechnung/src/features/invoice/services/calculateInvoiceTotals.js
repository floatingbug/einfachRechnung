export default function calculateInvoiceTotals(items){
	let netTotal = 0;
	const taxMap = {};

	for(const item of items){
		const net = item.quantity * item.unitPrice;
		const tax = net * (item.taxRate / 100);

		netTotal += net;

		if(!taxMap[item.taxRate]){
			taxMap[item.taxRate] = 0;
		}

		taxMap[item.taxRate] += tax;
	}

	const taxTotal = Object.values(taxMap).reduce((a, b) => a + b, 0);

	return {
		netTotal,
		taxBreakdown: taxMap,
		taxTotal,
		grossTotal: netTotal + taxTotal,
	};
}
