const DEFAULT_OFFER = {
	offerPrefix: "A",
	offerNumberFormat: "{prefix}{year}-{number}",

	defaultValidityDays: 7,

	introduction: "Vielen Dank für Ihre Anfrage.\nGerne unterbreiten wir Ihnen folgendes Angebot.",
	closing: "Wir freuen uns auf Ihren Auftrag.\nFür Rückfragen stehen wir Ihnen jederzeit gerne zur Verfügung.",

	showItemNumbers: true,
	showTaxRatePerItem: false,
};


export function mapDtoToOfferEntity({dto = {}} = {}){
	const offerEntity = {
		offerPrefix: dto.offerPrefix ?? DEFAULT_OFFER.offerPrefix,
		offerNumberFormat: dto.offerNumberFormat ?? DEFAULT_OFFER.offerNumberFormat,
		defaultValidityDays: dto.defaultValidityDays ?? DEFAULT_OFFER.defaultValidityDays,
		introduction: dto.introduction ?? DEFAULT_OFFER.introduction,
		closing: dto.closing ?? DEFAULT_OFFER.closing,
		showTaxRatePerItem: dto.showTaxRatePerItem ?? DEFAULT_OFFER.showTaxRatePerItem,
		showItemNumbers: dto.showItemNumbers ?? DEFAULT_OFFER.showItemNumbers,
	};

	return offerEntity;
}
