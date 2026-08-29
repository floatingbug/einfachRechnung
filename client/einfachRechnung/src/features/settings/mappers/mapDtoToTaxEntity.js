export function mapDtoToTaxEntity({dto} = {}){
	const taxSettings = {
		vatId: dto.vatId,
		taxNumber: dto.taxNumber,
		vatMode: dto.vatMode,
		defaultVatRate: dto.defaultVatRate,
		reducedVatRate: dto.reducedVatRate,
		taxCountryCode: dto.taxCountryCode,
		reverseChargeEnabled: dto.reverseChargeEnabled,
	};

	return taxSettings;
}
