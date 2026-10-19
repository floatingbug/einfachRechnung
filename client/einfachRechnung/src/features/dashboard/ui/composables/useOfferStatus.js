// Übersetzt den Status eines Angebots in Label und PrimeVue-Severity.
// Bekannt aus deinen Daten: draft, sent, cancelled, expired.
// Angenommen (bei Bedarf anpassen): accepted, declined.
const OFFER_STATUS = {
	draft: { label: "Entwurf", severity: "secondary" },
	sent: { label: "Versendet", severity: "info" },
	accepted: { label: "Angenommen", severity: "success" },
	declined: { label: "Abgelehnt", severity: "danger" },
	expired: { label: "Abgelaufen", severity: "warn" },
	cancelled: { label: "Storniert", severity: "contrast" },
};

export function useOfferStatus() {
	const getOfferStatus = (offer) =>
		OFFER_STATUS[offer.status] ?? { label: offer.status, severity: "secondary" };

	return { getOfferStatus };
}
