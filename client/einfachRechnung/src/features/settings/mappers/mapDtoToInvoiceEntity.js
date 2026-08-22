export function mapDtoToInvoiceEntity({dto} = {}){
	dto = dto ?? {};

	const invoice = {
		invoicePrefix: dto.invoicePrefix ?? "",
		invoiceNumberStart: dto.invoiceNumberStart ?? 0,
		invoiceNumberFormat: dto.invoiceNumberFormat ?? "",
		paymentTermsDays: dto.paymentTermsDays ?? 0,
		dueDays: dto.dueDays ?? 7,
		currency: dto.currency ?? "",
		language: dto.language ?? "",
		autoSendEnabled: dto.autoSendEnabled ?? false,
		taxRate: dto.taxRate ?? 19,
		paymentMethod: dto.paymentMethod ?? "",
	};

	return invoice;
};
