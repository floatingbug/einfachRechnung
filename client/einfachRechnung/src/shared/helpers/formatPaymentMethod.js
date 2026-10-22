const paymentMethodLabels = {
	bankTransfer: "Überweisung",
	bank_transfer: "Überweisung",
	cash: "Barzahlung",
	card: "Kartenzahlung",
	paypal: "PayPal",
	directDebit: "Lastschrift",
	direct_debit: "Lastschrift",
	other: "Sonstige",
};


export function formatPaymentMethod(method){
	if(!method){
		return "";
	}

	return paymentMethodLabels[method] ?? method;
}
