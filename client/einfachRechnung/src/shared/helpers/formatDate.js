const DATE_FORMATTER = new Intl.DateTimeFormat("de-DE");
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/;

// Formats a Date, timestamp or ISO date string as a German date.
// Values that are already formatted (e.g. localized strings from mappers) pass through unchanged.
export function formatDate(value){
	if(!value){
		return "";
	}

	if(value instanceof Date){
		return Number.isNaN(value.getTime()) ? "" : DATE_FORMATTER.format(value);
	}

	if(typeof value === "number"){
		return DATE_FORMATTER.format(new Date(value));
	}

	if(typeof value === "string"){
		if(!ISO_DATE_PATTERN.test(value)){
			return value;
		}

		const date = new Date(value);

		return Number.isNaN(date.getTime()) ? "" : DATE_FORMATTER.format(date);
	}

	return "";
}
