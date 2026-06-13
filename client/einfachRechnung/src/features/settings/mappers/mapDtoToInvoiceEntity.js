import {createInvoiceEntity} from "../entities";


export function mapDtoToInvoiceEntity({dto} = {}){
	dto = dto ?? {};

	const invoice = {
		invoicePrefix: dto.invoicePrefix ?? "",
		invoiceNumberStart: dto.invoiceNumberStart ?? 0,
		invoiceNumberFormat: dto.invoiceNumberFormat ?? "",
		defaultPaymentTermsDays: dto.defaultPaymentTermsDays ?? 0,
		defaultDueDays: dto.defaultDueDays ?? 0,
		currency: dto.currency ?? "",
		language: dto.language ?? "",
		autoSendEnabled: dto.autoSendEnabled ?? false,
		defaultTaxRate: dto.defaultTaxRate ?? 0,
	};

	return createInvoiceEntity({invoice});
};
