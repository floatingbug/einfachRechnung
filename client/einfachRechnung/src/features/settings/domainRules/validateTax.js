// src/features/settings/domainRules/validateTaxSettings.js

const COUNTRY_CODE_REGEX = /^[A-Z]{2}$/;

const VALID_COUNTRY_CODES = [
	"DE",
	"AT",
	"CH",
];

// --------------------
// main validator
// --------------------
export function validateTax({
	taxSettings,
} = {}){
	const normalizedTaxSettings =
		normalizeTaxSettings(taxSettings);

	const errors = {};

	// --------------------
	// vatEnabled
	// --------------------
	if(
		typeof normalizedTaxSettings.vatEnabled !==
		"boolean"
	){
		errors.vatEnabled =
			"Mehrwertsteuer aktiviert muss true oder false sein";
	}

	// --------------------
	// defaultVatRate
	// --------------------
	if(
		typeof normalizedTaxSettings.defaultVatRate !==
		"number"
	){
		errors.defaultVatRate =
			"Standard-Mehrwertsteuersatz ist erforderlich";
	}
	else if(
		normalizedTaxSettings.defaultVatRate < 0
	){
		errors.defaultVatRate =
			"Standard-Mehrwertsteuersatz darf nicht negativ sein";
	}
	else if(
		normalizedTaxSettings.defaultVatRate > 100
	){
		errors.defaultVatRate =
			"Standard-Mehrwertsteuersatz darf maximal 100 betragen";
	}

	// --------------------
	// reducedVatRate
	// --------------------
	if(
		typeof normalizedTaxSettings.reducedVatRate !==
		"number"
	){
		errors.reducedVatRate =
			"Reduzierter Mehrwertsteuersatz ist erforderlich";
	}
	else if(
		normalizedTaxSettings.reducedVatRate < 0
	){
		errors.reducedVatRate =
			"Reduzierter Mehrwertsteuersatz darf nicht negativ sein";
	}
	else if(
		normalizedTaxSettings.reducedVatRate > 100
	){
		errors.reducedVatRate =
			"Reduzierter Mehrwertsteuersatz darf maximal 100 betragen";
	}
	else if(
		normalizedTaxSettings.reducedVatRate >
		normalizedTaxSettings.defaultVatRate
	){
		errors.reducedVatRate =
			"Reduzierter Mehrwertsteuersatz darf nicht höher als der Standard-Mehrwertsteuersatz sein";
	}

	// --------------------
	// taxCountryCode
	// --------------------
	if(!normalizedTaxSettings.taxCountryCode){
		errors.taxCountryCode =
			"Steuer-Ländercode ist erforderlich";
	}
	else if(
		!COUNTRY_CODE_REGEX.test(
			normalizedTaxSettings.taxCountryCode,
		)
	){
		errors.taxCountryCode =
			"Ungültiger Steuer-Ländercode";
	}
	else if(
		!VALID_COUNTRY_CODES.includes(
			normalizedTaxSettings.taxCountryCode,
		)
	){
		errors.taxCountryCode =
			"Steuer-Ländercode wird nicht unterstützt";
	}

	// --------------------
	// reverseChargeEnabled
	// --------------------
	if(
		typeof normalizedTaxSettings.reverseChargeEnabled !==
		"boolean"
	){
		errors.reverseChargeEnabled =
			"Reverse-Charge aktiviert muss true oder false sein";
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
		data: normalizedTaxSettings,
	};
}

// --------------------
// normalization
// --------------------
function normalizeTaxSettings(
	taxSettings = {},
){
	const normalized = {};

	for(const [key, value] of Object.entries(
		taxSettings,
	)){
		if(typeof value === "string"){
			normalized[key] = value.trim();
		}
		else{
			normalized[key] = value;
		}
	}

	normalized.vatEnabled =
		Boolean(
			normalized.vatEnabled,
		);

	normalized.defaultVatRate =
		typeof normalized.defaultVatRate ===
		"number"
			? normalized.defaultVatRate
			: Number(
				normalized.defaultVatRate,
			);

	normalized.reducedVatRate =
		typeof normalized.reducedVatRate ===
		"number"
			? normalized.reducedVatRate
			: Number(
				normalized.reducedVatRate,
			);

	normalized.taxCountryCode =
		(normalized.taxCountryCode || "")
			.trim()
			.toUpperCase();

	normalized.reverseChargeEnabled =
		Boolean(
			normalized.reverseChargeEnabled,
		);

	return normalized;
}
