
export default function mapInvoiceDtoToEntity(dto = {}){
	const invoice = {
		id: dto._id ?? dto.id ?? "",
		invoiceNumber: dto.invoiceNumber ?? "",
		serviceDate: dto.serviceDate ?? null,
		dueDate: dto.dueDate ?? null,
		currency: dto.currency ?? "",
		note: dto.note ?? "",
		netTotal: dto.totals?.netTotal ?? 0,
		taxAmount: dto.taxBreakdown?.taxAmount ?? 0,
		grossTotal: dto.totals?.totalGross ?? 0,
		paidAmount: dto.payment?.paidAmount ?? 0,
		openAmount: dto.payment?.openAmount ?? 0,
		paymentStatus: dto.payment?.status ?? "",
		status: dto.status ?? "",
		createdAt: dto.createdAt ?? null,
		updatedAt: dto.updatedAt ?? null,
	};

	if(dto.invoiceDate){
		const date = new Date(dto.invoiceDate);
		invoice.invoiceDate = date.toLocaleDateString();
	}

	if(dto.serviceDate){
		const date = new Date(dto.serviceDate);
		invoice.serviceDate= date.toLocaleDateString();
	}

	if(dto.dueDate){
		const date = new Date(dto.dueDate);
		invoice.dueDate= date.toLocaleDateString();
	}

	if(dto.createdAt){
		const date = new Date(dto.createdAt);
		invoice.createdAt = date.toLocaleDateString();
	}

	if(dto.updatedAt){
		const date = new Date(dto.updatedAt);
		invoice.updatedAt = date.toLocaleDateString();
	}

	if(Array.isArray(dto.reminders)){
		invoice.reminders = dto.reminders;
	}
	else{
		invoice.reminders = [];
	}

	if(Array.isArray(dto.payments)){
		invoice.payments = dto.payments;
	}
	else{
		invoice.payments = [];
	}

	if(dto.seller) {
		invoice.seller = {
			name: dto.seller.name ?? "",
			street: dto.seller.street ?? "",
			city: dto.seller.city ?? "",
			postalCode: dto.seller.postalCode ?? "",
			countryCode: dto.seller.countryCode ?? "",
			vatId: dto.seller.vatId ?? "",
			email: dto.seller.email ?? "",
		};
	}
	else{
		invoice.seller = null;
	}


	if(dto.customer){
		invoice.customer = {
			street: dto.customer.street ?? "",
			city: dto.customer.city ?? "",
			postalCode: dto.customer.postalCode ?? "",
			countryCode: dto.customer.countryCode ?? "",
			vatId: dto.customer.vatId ?? "",
			email: dto.customer.email ?? "",
		};

		if(dto.customer.customerType === "company"){
			invoice.customer.name = dto.customer.companyName ?? "";
			invoice.customer.contactPerson = dto.customer.contactPerson ?? "";
		}
		else{
			invoice.customer.name = `${dto.customer.firstName} ${dto.customer.lastName}`;
		}
	}
	else{
		invoice.customer = null;
	}

	if(Array.isArray(dto.items)){
		invoice.items = dto.items.map(
			item => ({
				name: item.name ?? "",
				description: item.description ?? "",
				quantity: item.quantity ?? 0,
				unitPrice: item.unitPrice ?? 0,
				taxRate: item.taxRate ?? 0,
				netTotal: item.netTotal ?? 0,
				taxAmount: item.taxAmount ?? 0,
				grossTotal: item.grossTotal ?? 0,
			})
		);
	}

	return invoice;
}
