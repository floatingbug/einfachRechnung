const DEFAULT_COMPANY = {
	companyName: "",

	ownerName: "",
	signatory: "",
	greeting: "Mit freundlichen Grüßen",

	email: "",
	phone: "",
	website: "",

	street: "",
	city: "",
	postalCode: "",
	countryCode: "",

	vatId: "",
	taxNumber: "",
};


export function createCompanyEntity({company} = {}){
	return {
		...DEFAULT_COMPANY,
		...company,
	};
};
