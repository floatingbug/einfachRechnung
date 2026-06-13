import {createTaxEntity} from "../entities";


export function mapDtoToTaxEntity({dto} = {}){
	let tax = {};

	if(dto){
		tax = {
			vatEnabled: dto.vatEnabled ?? false,
			defaultVatRate: dto.defaultVatRate ?? 0,
			reducedVatRate: dto.reducedVatRate ?? 0,
			taxCountryCode: dto.taxCountryCode ?? "",
			reverseChargeEnabled: dto.reverseChargeEnabled ?? false,
		};
	}

	return createTaxEntity({tax});
}
