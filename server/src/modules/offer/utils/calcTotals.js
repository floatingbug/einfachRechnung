module.exports = function calcTotals(items) {
    function roundMoney(value) {
        return Math.round(value * 100) / 100;
    }

    const result = items.reduce(
        (acc, item) => {
            const lineNet = item.quantity * item.unitPrice;

            let lineDiscount = 0;

            if (item.discountType === "percentage") {
                lineDiscount = lineNet * (item.discountValue / 100);
            } else if (item.discountType === "fixed") {
                lineDiscount = item.discountValue;
            }

            const lineNetAfterDiscount = lineNet - lineDiscount;
            const lineTax = lineNetAfterDiscount * (item.taxRate / 100);

            acc.subtotalNet += lineNet;
            acc.discountNet += lineDiscount;
            acc.totalNet += lineNetAfterDiscount;
            acc.totalTax += lineTax;
            acc.totalGross += lineNetAfterDiscount + lineTax;

            const existingTaxRate = acc.taxBreakdown.find(
                entry => entry.taxRate === item.taxRate
            );

            if (existingTaxRate) {
                existingTaxRate.netAmount += lineNetAfterDiscount;
                existingTaxRate.taxAmount += lineTax;
            } else {
                acc.taxBreakdown.push({
                    taxRate: item.taxRate,
                    netAmount: lineNetAfterDiscount,
                    taxAmount: lineTax,
                });
            }

            return acc;
        },
        {
            subtotalNet: 0,
            discountNet: 0,
            totalNet: 0,
            totalTax: 0,
            totalGross: 0,
            taxBreakdown: [],
        }
    );

    result.subtotalNet = roundMoney(result.subtotalNet);
    result.discountNet = roundMoney(result.discountNet);
    result.totalNet = roundMoney(result.totalNet);
    result.totalTax = roundMoney(result.totalTax);
    result.totalGross = roundMoney(result.totalGross);

    result.taxBreakdown = result.taxBreakdown.map(entry => ({
        ...entry,
        netAmount: roundMoney(entry.netAmount),
        taxAmount: roundMoney(entry.taxAmount),
    }));

    result.taxBreakdown.sort((a, b) => b.taxRate - a.taxRate);

    return result;
}
