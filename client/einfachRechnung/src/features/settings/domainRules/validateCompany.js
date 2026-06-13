const COUNTRY_CODE_REGEX = /^[A-Z]{2}$/;

const VALID_COUNTRY_CODES = ["DE", "AT", "CH"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^[0-9+\-()\/\s]+$/;

const VAT_ID_REGEX = {
	DE: /^DE[0-9]{9}$/,
	AT: /^ATU[0-9]{8}$/,
};

const POSTAL_CODE_REGEX = {
	DE: /^[0-9]{5}$/,
	AT: /^[0-9]{4}$/,
	CH: /^[0-9]{4}$/,
};

// --------------------
// main validator
// --------------------
export function validateCompany({company} = {}){
	const normalizedCompany = normalizeCompany(company);

	const errors = {};

	// --- companyName ---
	if(!normalizedCompany.companyName){
		errors.companyName = "Firmenname ist erforderlich";
	}
	else if(normalizedCompany.companyName.length < 2){
		errors.companyName = "Firmenname muss mindestens 2 Zeichen enthalten";
	}
	else if(normalizedCompany.companyName.length > 120){
		errors.companyName = "Firmenname darf maximal 120 Zeichen lang sein";
	}

	// --- ownerName ---
	if(normalizedCompany.ownerName.length > 120){
		errors.ownerName = "Name des Inhabers darf maximal 120 Zeichen lang sein";
	}

	// --- email ---
	if(!normalizedCompany.email){
		errors.email = "E-Mail ist erforderlich";
	}
	else if(!EMAIL_REGEX.test(normalizedCompany.email)){
		errors.email = "Ungültiges E-Mail-Format";
	}

	// --- phone ---
	if(normalizedCompany.phone){
		if(!PHONE_REGEX.test(normalizedCompany.phone)){
			errors.phone = "Ungültiges Telefonnummern-Format";
		}
	}

	// --- website ---
	if(normalizedCompany.website){
		try{
			new URL(normalizedCompany.website);
		}
		catch{
			errors.website = "Ungültige Website-URL";
		}
	}

	// --- countryCode ---
	if(!normalizedCompany.countryCode){
		errors.countryCode = "Ländercode ist erforderlich";
	}
	else if(!VALID_COUNTRY_CODES.includes(normalizedCompany.countryCode)){
		errors.countryCode = "Ungültiger Ländercode";
	}

	// --- vatId ---
	if(normalizedCompany.vatId){
		const vatId = normalizedCompany.vatId.toUpperCase().trim();

		const vatCountryCode = vatId.slice(0, 2);

		const vatRegex = VAT_ID_REGEX[vatCountryCode];

		if(vatRegex && !vatRegex.test(vatId)){
			errors.vatId = "Ungültige Umsatzsteuer-ID";
		}

		// auto-fix countryCode
		normalizedCompany.countryCode = vatCountryCode;
	}

	// --- taxNumber ---
	if(normalizedCompany.taxNumber.length > 50){
		errors.taxNumber = "Steuernummer darf maximal 50 Zeichen lang sein";
	}

	// --- street ---
	if(!normalizedCompany.street){
		errors.street = "Straße ist erforderlich";
	}
	else if(normalizedCompany.street.length < 3){
		errors.street = "Straße muss mindestens 3 Zeichen enthalten";
	}
	else if(normalizedCompany.street.length > 120){
		errors.street = "Straße darf maximal 120 Zeichen lang sein";
	}

	// --- city ---
	if(!normalizedCompany.city){
		errors.city = "Stadt ist erforderlich";
	}
	else if(normalizedCompany.city.length > 120){
		errors.city = "Stadt darf maximal 120 Zeichen lang sein";
	}

	// --- postalCode ---
	if(!normalizedCompany.postalCode){
		errors.postalCode = "Postleitzahl ist erforderlich";
	}
	else{
		const postalCodeRegex =
			POSTAL_CODE_REGEX[normalizedCompany.countryCode];

		if(postalCodeRegex && !postalCodeRegex.test(normalizedCompany.postalCode)){
			errors.postalCode = "Ungültiges Postleitzahlen-Format";
		}
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
		data: normalizedCompany,
	};
}

// --------------------
// normalization
// --------------------
function normalizeCompany(company = {}){
	const normalized = {};

	for(const [key, value] of Object.entries(company)){
		if(typeof value === "string"){
			normalized[key] = value.trim();
		}
		else{
			normalized[key] = value;
		}
	}

	normalized.companyName = normalized.companyName || "";
	normalized.ownerName = normalized.ownerName || "";

	normalized.email = (normalized.email || "").toLowerCase();

	normalized.phone = normalized.phone || "";

	normalized.website = normalizeWebsite(normalized.website || "");

	normalized.street = normalized.street || "";
	normalized.city = normalized.city || "";
	normalized.postalCode = normalized.postalCode || "";

	normalized.countryCode = (normalized.countryCode || "").toUpperCase();

	normalized.vatId = (normalized.vatId || "").toUpperCase();

	normalized.taxNumber = normalized.taxNumber || "";

	return normalized;
}

// --------------------
// helpers
// --------------------
function normalizeWebsite(website = ""){
	if(!website){
		return "";
	}

	const hasProtocol =
		website.startsWith("http://") ||
		website.startsWith("https://");

	if(hasProtocol){
		return website;
	}

	return `https://${website}`;
}
