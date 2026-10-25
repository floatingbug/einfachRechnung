// Label + PrimeVue severity for offer statuses.
// Severities follow the conventions used in the dashboard composables.
// Both spellings (rejected/declined, cancelled/canceled) occur in the data.
const OFFER_STATUS = {
	draft: { label: "Entwurf", severity: "secondary" },
	sent: { label: "Versendet", severity: "info" },
	accepted: { label: "Angenommen", severity: "success" },
	rejected: { label: "Abgelehnt", severity: "danger" },
	declined: { label: "Abgelehnt", severity: "danger" },
	expired: { label: "Abgelaufen", severity: "warn" },
	cancelled: { label: "Storniert", severity: "contrast" },
	canceled: { label: "Storniert", severity: "contrast" },
};


export function getOfferStatus(status) {
	return OFFER_STATUS[status] ?? { label: status ?? "-", severity: "secondary" };
}
