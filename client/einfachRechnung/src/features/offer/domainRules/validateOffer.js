const OFFER_PREFIX_REGEX = /^[A-Z0-9\-_]+$/;

// --------------------
// main validator
// --------------------
export function validateOffer({
	offer,
} = {}){
	const normalizedOffer = normalizeOffer(offer);

	const errors = {};

	// --------------------
	// title
	// --------------------
	if(!normalizedOffer.title){
		errors.title = "Titel ist erforderlich";
	}
	else if(normalizedOffer.title.length > 120){
		errors.title = "Titel ist zu lang";
	}

	// --------------------
	// customerId
	// --------------------
	if(!normalizedOffer.customerId){
		errors.customerId = "Kunde ist erforderlich";
	}

	// --------------------
	// taxRate
	// --------------------
	if(typeof normalizedOffer.taxRate !== "number"){
		errors.taxRate = "Steuersatz ist erforderlich";
	}
	else if(normalizedOffer.taxRate < 0){
		errors.taxRate = "Steuersatz darf nicht negativ sein";
	}
	else if(normalizedOffer.taxRate > 100){
		errors.taxRate = "Steuersatz darf maximal 100 sein";
	}

	// --------------------
	// items
	// --------------------
	if(!Array.isArray(normalizedOffer.items) || normalizedOffer.items.length === 0){
		errors.items = "Mindestens eine Position ist erforderlich";
	}
	else{

		const itemErrors = [];

		normalizedOffer.items.forEach((item, index) => {

			const e = {};

			// title
			if(!item.title){
				e.title = "Leistung ist erforderlich";
			}
			else if(item.title.length > 120){
				e.title = "Leistung ist zu lang";
			}

			// quantity
			if(typeof item.quantity !== "number" || !Number.isFinite(item.quantity)){
				e.quantity = "Menge ist ungültig";
			}
			else if(item.quantity <= 0){
				e.quantity = "Menge muss größer als 0 sein";
			}

			// unit
			if(!item.unit){
				e.unit = "Einheit ist erforderlich";
			}

			// unitPrice
			if(typeof item.unitPrice !== "number" || !Number.isFinite(item.unitPrice)){
				e.unitPrice = "Preis ist ungültig";
			}
			else if(item.unitPrice < 0){
				e.unitPrice = "Preis darf nicht negativ sein";
			}

			if(Object.keys(e).length > 0){
				itemErrors[index] = e;
			}
		});

		if(itemErrors.length > 0){
			errors.items = itemErrors;
		}
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
		data: normalizedOffer,
	};
}

// --------------------
// normalization
// --------------------
function normalizeOffer(offer = {}){
	const normalized = {};

	for(const [key, value] of Object.entries(offer)){
		if(typeof value === "string"){
			normalized[key] = value.trim();
		}
		else{
			normalized[key] = value;
		}
	}

	// --------------------
	// core fields
	// --------------------
	normalized.title = normalized.title || "";
	normalized.customerId = normalized.customerId || "";

	// --------------------
	// tax
	// --------------------
	normalized.taxRate =
		typeof normalized.taxRate === "number"
			? normalized.taxRate
			: Number(normalized.taxRate || 0);

	// --------------------
	// items
	// --------------------
	normalized.items = Array.isArray(normalized.items)
		? normalized.items.map((item) => ({
			id: item.id,
			title: item.title || "",
			description: item.description || "",
			quantity:
				typeof item.quantity === "number"
					? item.quantity
					: Number(item.quantity || 0),
			unit: item.unit || "",
			unitPrice:
				typeof item.unitPrice === "number"
					? item.unitPrice
					: Number(item.unitPrice || 0),
		}))
		: [];

	return normalized;
}
