import { createCustomerEntity } from "../entities";

export function mapCustomerDtoToEntity(dto = {}){
	return createCustomerEntity({
		id: dto._id || dto.id || "",
		name: dto.name || "",
		street: dto.street || "",
		postalCode: dto.postalCode || 0,
		city: dto.city || "",
		countryCode: dto.countryCode || "DE",
		phone: dto.phone || 0,
		email: dto.email || "",
		vatId: dto.vatId || "",
	});
}
