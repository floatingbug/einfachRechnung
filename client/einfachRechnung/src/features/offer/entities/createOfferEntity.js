const DEFAULT_OFFER = {
	id: "",

	offerNumber: "",

	title: "",
	description: "",

	customerId: "",

	status: "draft",

	createdAt: "",
	updatedAt: "",

	currency: "EUR",
	taxRate: 19,

	pricingMode: "net",
	taxIncluded: false,

	validUntil: null,

	notes: "",

	items: [],
};


export function createOfferEntity({offer} = {}){
	return {
		...DEFAULT_OFFER,
		...offer,
	};
}
