// Formatter werden einmal erzeugt und von allen Komponenten geteilt
const currency = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
});

const currencyShort = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
	maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("de-DE");
const monthShort = new Intl.DateTimeFormat("de-DE", { month: "short" });
const monthLong = new Intl.DateTimeFormat("de-DE", {
	month: "long",
	year: "numeric",
});

// "2026-10" -> Date (lokal, 1. des Monats)
const parseMonth = (key) => {
	const [year, month] = key.split("-").map(Number);
	return new Date(year, month - 1, 1);
};

export function useFormatters() {
	return {
		formatCurrency: (value) => currency.format(value ?? 0),
		// ISO-String oder Date -> "15.10.2026"
		formatDate: (value) => (value ? dateFormatter.format(new Date(value)) : "–"),
		formatCurrencyShort: (value) => currencyShort.format(value ?? 0),
		formatMonthShort: (key) =>
			monthShort.format(parseMonth(key)).replace(".", ""), // "Okt." -> "Okt"
		formatMonthLong: (key) => monthLong.format(parseMonth(key)),
	};
}
