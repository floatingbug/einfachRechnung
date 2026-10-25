// Label + PrimeVue severity for invoice statuses.
// Severities follow the conventions used in the dashboard composables.
const INVOICE_STATUS = {
	draft: { label: "Entwurf", severity: "secondary" },
	sent: { label: "Gesendet", severity: "info" },
	cancelled: { label: "Storniert", severity: "contrast" },
	paid: { label: "Bezahlt", severity: "success" },
};

const PAYMENT_STATUS = {
	unpaid: { label: "Unbezahlt", severity: "danger" },
	partial: { label: "Teilzahlung", severity: "warn" },
	partially_paid: { label: "Teilzahlung", severity: "warn" },
	paid: { label: "Bezahlt", severity: "success" },
};


export function getInvoiceStatus(status) {
	return INVOICE_STATUS[status] ?? { label: status ?? "-", severity: "secondary" };
}

export function getPaymentStatus(status) {
	return PAYMENT_STATUS[status] ?? { label: status ?? "-", severity: "secondary" };
}
