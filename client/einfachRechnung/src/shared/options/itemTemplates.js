export const itemTemplates = [
	{
		label: "Leere Position",
		value: "empty",
		create: () => ({
			title: "",
			description: "",
			unit: "piece",
			type: "service",
		}),
	},
	{
		label: "Anfahrt",
		value: "travel",
		create: () => ({
			title: "Anfahrt",
			description: "",
			unit: "kilometer",
			type: "service",
		}),
	},
	{
		label: "Lieferung",
		value: "delivery",
		create: () => ({
			title: "Lieferung",
			description: "",
			unit: "flat",
			type: "service",
		}),
	},
	{
		label: "Transport",
		value: "transport",
		create: () => ({
			title: "Transport",
			description: "",
			unit: "hour",
			type: "service",
		}),
	},
	{
		label: "Entsorgung",
		value: "disposal",
		create: () => ({
			title: "Entsorgung",
			description: "",
			unit: "cubicMeter",
			type: "service",
		}),
	},
	{
		label: "Kran / Hubgerät",
		value: "equipment",
		create: () => ({
			title: "Kran / Hubgerät",
			description: "",
			unit: "hour",
			type: "equipment",
		}),
	},
	{
		label: "Baustelleneinrichtung",
		value: "constructionSite",
		create: () => ({
			title: "Baustelleneinrichtung",
			description: "",
			unit: "flat",
			type: "service",
		}),
	},
];
