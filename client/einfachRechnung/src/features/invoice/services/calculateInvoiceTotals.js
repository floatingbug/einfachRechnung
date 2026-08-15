export default function calculateInvoiceTotals(items){
	const roundCurrency = value => Math.round((value + Number.EPSILON) * 100) / 100;
	let netTotal = 0;
	const taxMap = {};

	for(const item of items){
		const net = item.quantity * item.unitPrice;
		const tax = roundCurrency(net * (item.taxRate / 100));

		netTotal += net;

		if(!taxMap[item.taxRate]){
			taxMap[item.taxRate] = 0;
		}

		taxMap[item.taxRate] = roundCurrency(taxMap[item.taxRate] + tax);
	}

	const taxTotal = roundCurrency(Object.values(taxMap).reduce((a, b) => a + b, 0));

	return {
		netTotal,
		taxBreakdown: taxMap,
		taxTotal,
		grossTotal: roundCurrency(netTotal + taxTotal),
	};
}
