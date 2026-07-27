import { createCustomerEntity } from "../entities";

export function mapCustomerDtoToEntity(dto = {}){
	return createCustomerEntity({
		id: dto._id || "",
		userId: dto.userId || dto.id || "",
		customerNumber: dto.customerNumber || "",
		customerType: dto.customerType || "",
		firstName: dto.firstName || "",
		lastName: dto.lastName || "",
		companyName: dto.companyName || "",
		contactPerson: dto.contactPerson || "",
		street: dto.street || "",
		postalCode: dto.postalCode || 0,
		city: dto.city || "",
		countryCode: dto.countryCode || "DE",
		phone: dto.phone || 0,
		email: dto.email || "",
		vatId: dto.vatId || "",
	});
}
