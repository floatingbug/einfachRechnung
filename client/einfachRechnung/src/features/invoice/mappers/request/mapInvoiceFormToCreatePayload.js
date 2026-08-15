export default function mapInvoiceFormToCreatePayload(form){
	return {
		seller: {
			name: form.seller.name,
			street: form.seller.street,
			postalCode: form.seller.postalCode,
			city: form.seller.city,
			vatId: form.seller.vatId || undefined,
			taxNumber: form.seller.taxNumber || undefined,
		},
		customer: {
			name: form.customer.name,
			street: form.customer.street,
			postalCode: form.customer.postalCode,
			city: form.customer.city,
			email: form.customer.email || undefined,
			vatId: form.customer.vatId || undefined
		},
		items: form.items.map(item => ({
			name: item.name,
			description: item.description || undefined,
			quantity: item.quantity,
			unitPrice: item.unitPrice,
			taxRate: item.taxRate
		})),
		invoiceDate: form.invoiceDate || undefined,
		dueDate: form.dueDate || undefined,
		serviceDate: form.serviceDate || undefined,
		note: form.note || undefined
	};
}
