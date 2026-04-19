import { createInvoiceEntity } from "../../entities";

export default function mapInvoiceDtoToEntity(dto = {}){
	return createInvoiceEntity({
		id: dto._id || dto.id || "",
		invoiceNumber: dto.invoiceNumber || "",
		seller: dto.seller
			? {
				name: dto.seller.name || "",
				street: dto.seller.street || "",
				city: dto.seller.city || "",
				postalCode: dto.seller.postalCode || "",
				countryCode: dto.seller.countryCode || "",
				vatId: dto.seller.vatId || "",
				email: dto.seller.email || "",
			}
			: null,
		customer: dto.customer
			? {
				name: dto.customer.name || "",
				street: dto.customer.street || "",
				city: dto.customer.city || "",
				postalCode: dto.customer.postalCode || "",
				countryCode: dto.customer.countryCode || "",
				vatId: dto.customer.vatId || "",
				email: dto.customer.email || "",
			}
			: null,
		invoiceDate: dto.invoiceDate || null,
		dueDate: dto.dueDate || null,
		currency: dto.currency || "",
		items: Array.isArray(dto.items)
			? dto.items.map(function(item){
				return {
					name: item.name || "",
					description: item.description || "",
					quantity: item.quantity || 0,
					unitPrice: item.unitPrice || 0,
					taxRate: item.taxRate || 0,
					netTotal: item.netTotal || 0,
					taxAmount: item.taxAmount || 0,
					grossTotal: item.grossTotal || 0,
				};
			})
			: [],
		note: dto.note || "",
		netTotal: dto.netTotal || 0,
		taxAmount: dto.taxAmount || 0,
		grossTotal: dto.grossTotal || 0,
		paidAmount: dto.paidAmount || 0,
		openAmount: dto.openAmount || 0,
		paymentStatus: dto.paymentStatus || "",
		status: dto.status || "",
		payments: Array.isArray(dto.payments) ? dto.payments : [],
		createdAt: dto.createdAt || null,
		updatedAt: dto.updatedAt || null,
	});
}
