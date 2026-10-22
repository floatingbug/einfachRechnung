const paymentStatusLabels = {
	unpaid: "Unbezahlt",
	partial: "Teilbezahlt",
	partially_paid: "Teilbezahlt",
	paid: "Bezahlt",
};


export function formatPaymentStatus(status){
	if(!status){
		return "";
	}

	return paymentStatusLabels[status] ?? status;
}
