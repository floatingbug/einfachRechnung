export function createTaxEntity(){
	return {
		vatMode: "standard",
		defaultVatRate: 19,
		reducedVatRate: 7,
		taxCountryCode: "DE",
		reverseChargeEnabled: false
	};
};
