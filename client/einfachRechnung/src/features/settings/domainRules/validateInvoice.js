// src/features/settings/domainRules/validateInvoiceSettings.js

const VALID_CURRENCIES = [
	"EUR",
	"USD",
	"CHF",
];

const VALID_LANGUAGES = [
	"de",
	"en",
	"fr",
	"it",
];

const INVOICE_PREFIX_REGEX = /^[A-Z0-9\-_]+$/;

// --------------------
// main validator
// --------------------
export function validateInvoice({
	invoiceSettings,
} = {}){
	const normalizedInvoiceSettings =
		normalizeInvoiceSettings(invoiceSettings);

	const errors = {};

	// --------------------
	// invoicePrefix
	// --------------------
	if(!normalizedInvoiceSettings.invoicePrefix){
		errors.invoicePrefix =
			"Rechnungspräfix ist erforderlich";
	}
	else if(
		normalizedInvoiceSettings.invoicePrefix.length < 1
	){
		errors.invoicePrefix =
			"Rechnungspräfix muss mindestens 1 Zeichen enthalten";
	}
	else if(
		normalizedInvoiceSettings.invoicePrefix.length > 20
	){
		errors.invoicePrefix =
			"Rechnungspräfix darf maximal 20 Zeichen lang sein";
	}
	else if(
		!INVOICE_PREFIX_REGEX.test(
			normalizedInvoiceSettings.invoicePrefix,
		)
	){
		errors.invoicePrefix =
			"Rechnungspräfix enthält ungültige Zeichen";
	}

	// --------------------
	// invoiceNumberStart
	// --------------------
	if(
		typeof normalizedInvoiceSettings.invoiceNumberStart !==
		"number"
	){
		errors.invoiceNumberStart =
			"Startwert der Rechnungsnummer ist erforderlich";
	}
	else if(
		!Number.isInteger(
			normalizedInvoiceSettings.invoiceNumberStart,
		)
	){
		errors.invoiceNumberStart =
			"Startwert der Rechnungsnummer muss eine ganze Zahl sein";
	}
	else if(
		normalizedInvoiceSettings.invoiceNumberStart < 1
	){
		errors.invoiceNumberStart =
			"Startwert der Rechnungsnummer muss größer als 0 sein";
	}

	// --------------------
	// invoiceNumberFormat
	// --------------------
	if(!normalizedInvoiceSettings.invoiceNumberFormat){
		errors.invoiceNumberFormat =
			"Rechnungsnummernformat ist erforderlich";
	}
	else if(
		normalizedInvoiceSettings.invoiceNumberFormat.length >
		120
	){
		errors.invoiceNumberFormat =
			"Rechnungsnummernformat darf maximal 120 Zeichen lang sein";
	}

	// --------------------
	// defaultPaymentTermsDays
	// --------------------
	if(
		typeof normalizedInvoiceSettings.defaultPaymentTermsDays !==
		"number"
	){
		errors.defaultPaymentTermsDays =
			"Standard-Zahlungsziel ist erforderlich";
	}
	else if(
		!Number.isInteger(
			normalizedInvoiceSettings.defaultPaymentTermsDays,
		)
	){
		errors.defaultPaymentTermsDays =
			"Standard-Zahlungsziel muss eine ganze Zahl sein";
	}
	else if(
		normalizedInvoiceSettings.defaultPaymentTermsDays < 0
	){
		errors.defaultPaymentTermsDays =
			"Standard-Zahlungsziel darf nicht negativ sein";
	}
	else if(
		normalizedInvoiceSettings.defaultPaymentTermsDays > 365
	){
		errors.defaultPaymentTermsDays =
			"Standard-Zahlungsziel darf maximal 365 Tage betragen";
	}

	// --------------------
	// defaultDueDays
	// --------------------
	if(
		typeof normalizedInvoiceSettings.defaultDueDays !==
		"number"
	){
		errors.defaultDueDays =
			"Standard-Fälligkeitsdauer ist erforderlich";
	}
	else if(
		!Number.isInteger(
			normalizedInvoiceSettings.defaultDueDays,
		)
	){
		errors.defaultDueDays =
			"Standard-Fälligkeitsdauer muss eine ganze Zahl sein";
	}
	else if(
		normalizedInvoiceSettings.defaultDueDays < 0
	){
		errors.defaultDueDays =
			"Standard-Fälligkeitsdauer darf nicht negativ sein";
	}
	else if(
		normalizedInvoiceSettings.defaultDueDays > 365
	){
		errors.defaultDueDays =
			"Standard-Fälligkeitsdauer darf maximal 365 Tage betragen";
	}

	// --------------------
	// currency
	// --------------------
	if(!normalizedInvoiceSettings.currency){
		errors.currency = "Währung ist erforderlich";
	}
	else if(
		!VALID_CURRENCIES.includes(
			normalizedInvoiceSettings.currency,
		)
	){
		errors.currency = "Ungültige Währung";
	}

	// --------------------
	// language
	// --------------------
	if(!normalizedInvoiceSettings.language){
		errors.language = "Sprache ist erforderlich";
	}
	else if(
		!VALID_LANGUAGES.includes(
			normalizedInvoiceSettings.language,
		)
	){
		errors.language = "Ungültige Sprache";
	}

	// --------------------
	// autoSendEnabled
	// --------------------
	if(
		typeof normalizedInvoiceSettings.autoSendEnabled !==
		"boolean"
	){
		errors.autoSendEnabled =
			"Automatischer Versand muss true oder false sein";
	}

	// --------------------
	// defaultTaxRate
	// --------------------
	if(
		typeof normalizedInvoiceSettings.defaultTaxRate !==
		"number"
	){
		errors.defaultTaxRate =
			"Standard-Steuersatz ist erforderlich";
	}
	else if(
		normalizedInvoiceSettings.defaultTaxRate < 0
	){
		errors.defaultTaxRate =
			"Standard-Steuersatz darf nicht negativ sein";
	}
	else if(
		normalizedInvoiceSettings.defaultTaxRate > 100
	){
		errors.defaultTaxRate =
			"Standard-Steuersatz darf maximal 100 betragen";
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
		data: normalizedInvoiceSettings,
	};
}

// --------------------
// normalization
// --------------------
function normalizeInvoiceSettings(
	invoiceSettings = {},
){
	const normalized = {};

	for(const [key, value] of Object.entries(
		invoiceSettings,
	)){
		if(typeof value === "string"){
			normalized[key] = value.trim();
		}
		else{
			normalized[key] = value;
		}
	}

	normalized.invoicePrefix =
		(normalized.invoicePrefix || "")
			.trim()
			.toUpperCase();

	normalized.invoiceNumberStart =
		typeof normalized.invoiceNumberStart ===
		"number"
			? normalized.invoiceNumberStart
			: Number(
				normalized.invoiceNumberStart,
			);

	normalized.invoiceNumberFormat =
		normalized.invoiceNumberFormat || "";

	normalized.defaultPaymentTermsDays =
		typeof normalized.defaultPaymentTermsDays ===
		"number"
			? normalized.defaultPaymentTermsDays
			: Number(
				normalized.defaultPaymentTermsDays,
			);

	normalized.defaultDueDays =
		typeof normalized.defaultDueDays ===
		"number"
			? normalized.defaultDueDays
			: Number(
				normalized.defaultDueDays,
			);

	normalized.currency =
		(normalized.currency || "")
			.trim()
			.toUpperCase();

	normalized.language =
		(normalized.language || "")
			.trim()
			.toLowerCase();

	normalized.autoSendEnabled =
		Boolean(
			normalized.autoSendEnabled,
		);

	normalized.defaultTaxRate =
		typeof normalized.defaultTaxRate ===
		"number"
			? normalized.defaultTaxRate
			: Number(
				normalized.defaultTaxRate,
			);

	return normalized;
}
