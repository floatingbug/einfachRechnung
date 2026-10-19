// Übersetzt die Statusfelder einer Rechnung in Label und PrimeVue-Severity.
// Erwartet: { status, paymentStatus, isOverdue } aus dem Dashboard-Endpoint.
export function useInvoiceStatus() {
	const getInvoiceStatus = (invoice) => {
		if (invoice.status === "draft") {
			return { label: "Entwurf", severity: "secondary" };
		}
		if (invoice.status === "cancelled") {
			return { label: "Storniert", severity: "contrast" };
		}
		if (invoice.paymentStatus === "paid") {
			return { label: "Bezahlt", severity: "success" };
		}
		if (invoice.isOverdue) {
			return { label: "Überfällig", severity: "danger" };
		}
		if (invoice.paymentStatus === "partial") {
			return { label: "Teilweise bezahlt", severity: "warn" };
		}
		return { label: "Versendet", severity: "info" };
	};

	return { getInvoiceStatus };
}
