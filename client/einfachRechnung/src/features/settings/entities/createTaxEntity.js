const DEFAULT_TAX = {
	vatEnabled: true,
	defaultVatRate: 19,
	reducedVatRate: 7,
	taxCountryCode: "DE",
	reverseChargeEnabled: false,
};


export function createTaxEntity({tax} = {}){
	return {
		...DEFAULT_TAX,
		...tax,
	};
};
