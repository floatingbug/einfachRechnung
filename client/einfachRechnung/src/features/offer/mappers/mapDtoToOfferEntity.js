import {createOfferEntity} from "../entities";


export function mapDtoToOfferEntity({dto} = {}){
	const offer = {
		offerPrefix: dto.offerPrefix ?? "",
		offerNumberStart: dto.offerNumberStart ?? 0,
		offerNumberFormat: dto.offerNumberFormat ?? "",

		defaultPaymentTermsDays: dto.defaultPaymentTermsDays ?? 0,
		defaultDueDays: dto.defaultDueDays ?? 0,

		currency: dto.currency ?? "",
		language: dto.language ?? "",

		autoSendEnabled: dto.autoSendEnabled ?? false,

		defaultTaxRate: dto.defaultTaxRate ?? 0,
	};

	return createOfferEntity({offer});
}
