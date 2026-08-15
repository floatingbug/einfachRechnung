import { createCustomerEntity } from "../entities";

export function mapCustomerDtoToEntity(dto = {}){
	return createCustomerEntity({
		id: dto._id ?? dto.id ?? "",
		userId: dto.userId ?? "",
		name: dto.name ?? [dto.firstName, dto.lastName].filter(Boolean).join(" "),
		customerNumber: dto.customerNumber || "",
		customerType: dto.customerType || "",
		firstName: dto.firstName || "",
		lastName: dto.lastName || "",
		companyName: dto.companyName || "",
		contactPerson: dto.contactPerson || "",
		street: dto.street || "",
		postalCode: dto.postalCode ?? "",
		city: dto.city || "",
		countryCode: dto.countryCode || "DE",
		phone: dto.phone ?? "",
		email: dto.email || "",
		vatId: dto.vatId || "",
	});
}
