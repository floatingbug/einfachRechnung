const roundCurrency = require("./roundCurrency");


module.exports = (items) => {
	let subtotalNet = 0;
	let discountNet = 0;
	let totalTax = 0;

	const taxBreakdown = {};

	for (const item of items) {
		const itemNet = roundCurrency(
			item.quantity * item.unitPrice
		);

		let itemDiscount = 0;

		if (item.discountType === "percentage") {
			itemDiscount = roundCurrency(
				itemNet * (item.discountValue / 100)
			);
		}
		else if (item.discountType === "fixed") {
			itemDiscount = roundCurrency(
				item.discountValue
			);
		}

		const netAmount = roundCurrency(
			itemNet - itemDiscount
		);

		const taxAmount = roundCurrency(
			netAmount * (item.taxRate / 100)
		);

		subtotalNet += itemNet;
		discountNet += itemDiscount;
		totalTax += taxAmount;

		if (!taxBreakdown[item.taxRate]) {
			taxBreakdown[item.taxRate] = {
				taxRate: item.taxRate,
				netAmount: 0,
				taxAmount: 0,
			};
		}

		taxBreakdown[item.taxRate].netAmount += netAmount;
		taxBreakdown[item.taxRate].taxAmount += taxAmount;
	}

	subtotalNet = roundCurrency(subtotalNet);
	discountNet = roundCurrency(discountNet);

	const totalNet = roundCurrency(
		subtotalNet - discountNet
	);

	totalTax = roundCurrency(totalTax);

	const totalGross = roundCurrency(
		totalNet + totalTax
	);

	return {
		subtotalNet,
		discountNet,
		taxBreakdown: Object.values(taxBreakdown).map((item) => ({
			taxRate: item.taxRate,
			netAmount: roundCurrency(item.netAmount),
			taxAmount: roundCurrency(item.taxAmount),
		})),
		totalNet,
		totalTax,
		totalGross,
	};
};
