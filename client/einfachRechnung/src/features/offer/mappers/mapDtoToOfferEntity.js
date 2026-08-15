export function mapDtoToOfferEntity({dtoOffer}){
	const offerDate = new Date(dtoOffer.offerDate);
	const validUntil = new Date(dtoOffer.validUntil);
	const createdAt = new Date(dtoOffer.createdAt);
	const updatedAt = new Date(dtoOffer.updatedAt);


	const offerEntity = {
		project: dtoOffer.project,
		offerNumber: dtoOffer.offerNumber,
		customerId: dtoOffer.customerId,
		customerName: dtoOffer.customerName,
		companyName: dtoOffer.companyName,
		customerType: dtoOffer.customerType,
		offerDate: offerDate,
		validUntil: validUntil,
		createdAt: createdAt,
		updatedAt: updatedAt,
		status: dtoOffer.status,
		customerSnapshot: dtoOffer.customerSnapshot,
		introduction: dtoOffer.introduction,
		closing: dtoOffer.closing,
		items: dtoOffer.items,
		showTaxRatePerItem: dtoOffer.showTaxRatePerItem,
		showItemNumbers: dtoOffer.showItemNumbers,
		contactPerson: dtoOffer.contactPerson ?? "",
		totals: {
			subtotalNet: dtoOffer.subtotalNet,
			discountNet: dtoOffer.discountNet,
			totalNet: dtoOffer.totalNet,
			totalTax: dtoOffer.totalTax,
			totalGross: dtoOffer.totalGross,
			taxBreakdown: dtoOffer.taxBreakdown,
		},
	};

	return offerEntity;
}
