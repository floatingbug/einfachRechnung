export function createOfferEntity(overrides = {}) {
	const date = new Date();

	const dateIn7Days = new Date(date);
	dateIn7Days.setDate(dateIn7Days.getDate() + 7);

	return {
		customerId: null,

		offerDate: date.toISOString(),
		validUntil: dateIn7Days.toISOString(),

		project: "",

		discountType: "none",
		discountValue: null,

		introduction:
			"Vielen Dank für Ihre Anfrage.\nGerne unterbreiten wir Ihnen folgendes Angebot.",

		closing:
			"Wir freuen uns auf Ihren Auftrag.\nFür Rückfragen stehen wir Ihnen jederzeit gerne zur Verfügung.",

		items: [],

		...overrides,
	};
}
