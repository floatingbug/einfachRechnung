const DEFAULT_OFFER = {
	customerId: null,

	offerDate: "",
	validUntil: "",

	project: "",

	discountType: "none",
	discountValue: null,

	introduction: "",
	closing: "",

	items: []
};


export function createOfferEntity({offer} = {}){
	return {
		...DEFAULT_OFFER,
		...offer,
	};
}
