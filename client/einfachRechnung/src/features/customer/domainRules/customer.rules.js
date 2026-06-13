export function isValidCustomer(customer){
	const errors = {};

	if(!customer){
		return {
			valid: false,
			errors: {
				customer: ["REQUIRED"],
			},
		};
	}

	if(typeof customer !== "object"){
		return {
			valid: false,
			errors: {
				customer: ["INVALID_TYPE"],
			},
		};
	}

	if(
		typeof customer.name !== "string" ||
		customer.name.trim() === ""
	){
		errors.name = errors.name || [];
		errors.name.push("REQUIRED");
	}

	if(
		customer.street !== undefined &&
		typeof customer.street !== "string"
	){
		errors.street = errors.street || [];
		errors.street.push("INVALID_TYPE");
	}

	if(
		customer.postalCode !== undefined &&
		typeof customer.postalCode !== "string"
	){
		errors.postalCode = errors.postalCode || [];
		errors.postalCode.push("INVALID_TYPE");
	}

	if(
		customer.city !== undefined &&
		typeof customer.city !== "string"
	){
		errors.city = errors.city || [];
		errors.city.push("INVALID_TYPE");
	}

	if(
		customer.countryCode !== undefined &&
		typeof customer.countryCode !== "string"
	){
		errors.countryCode = errors.countryCode || [];
		errors.countryCode.push("INVALID_TYPE");
	}

	if(
		customer.phone !== undefined &&
		typeof customer.phone !== "string"
	){
		errors.phone = errors.phone || [];
		errors.phone.push("INVALID_TYPE");
	}

	if(
		customer.email !== undefined &&
		typeof customer.email !== "string"
	){
		errors.email = errors.email || [];
		errors.email.push("INVALID_TYPE");
	}

	if(
		customer.vatId !== undefined &&
		typeof customer.vatId !== "string"
	){
		errors.vatId = errors.vatId || [];
		errors.vatId.push("INVALID_TYPE");
	}

	const valid = Object.keys(errors).length === 0;

	return {
		valid,
		errors,
	};
}
