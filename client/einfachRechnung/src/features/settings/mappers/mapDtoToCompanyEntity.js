import {createCompanyEntity} from "../entities";


export function mapDtoToCompanyEntity({dto} = {}){
	const company = {
		companyName: dto.companyName ?? "",
		ownerName: dto.ownerName ?? "",
		email: dto.email ?? "",
		phone: dto.phone ?? "",
		website: dto.website ?? "",
		vatId: dto.vatId ?? "",
		taxNumber: dto.taxNumber ?? "",
		street: dto.street ?? "",
		city: dto.city ?? "",
		postalCode: dto.postalCode ?? "",
		countryCode: dto.countryCode ?? "",
		bank: {
			bankName: dto.bank?.bankName ?? "",
			iban: dto.bank?.iban ?? "",
			bic: dto.bank?.bic ?? "",
		},
	};

	return createCompanyEntity({company});
}
