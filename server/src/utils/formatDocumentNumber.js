// Formats a document number from the configured pattern, e.g. "{prefix}{year}-{number}".
module.exports = ({
	format,
	prefix = "",
	number,
	date = new Date(),
	numberLength = 5,
}) => {
	if (number == null) {
		throw new Error("number is required");
	}

	if (!format) {
		throw new Error("format is required");
	}

	const year = date.getFullYear();
	const paddedNumber = String(number).padStart(numberLength, "0");

	return format
		.replaceAll("{prefix}", prefix)
		.replaceAll("{year}", String(year))
		.replaceAll("{number}", paddedNumber);
};
