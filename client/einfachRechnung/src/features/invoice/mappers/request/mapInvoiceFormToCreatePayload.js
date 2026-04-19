export default function mapInvoiceFormToCreatePayload(form){
	return {
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
		note: form.note || undefined
	};
}
