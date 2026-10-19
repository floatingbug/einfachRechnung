import {ref} from "vue";


export const filterItems = ref([
	{
		type: "text",
		label: "Rechnungsnummer",
		field: "invoiceNumber",
		value: "",
	},
	{
		type: "text",
		label: "Name",
		field: "name",
		value: "",
	},
	{
		type: "text",
		label: "Rechnungsdatum",
		field: "invoiceDate",
		value: "",
	},
	{
		type: "text",
		label: "Fälligkeitsdatum",
		field: "dueDate",
		value: "",
	},
	{
		type: "select",
		field: "status",
		value: "",
		selectItems: [
			{
				label: "Entwurf",
				value: "draft",
			},
			{
				label: "Versendet",
				value: "sent",
			},
			{
				label: "Storniert",
				value: "canceld",
			},
		],
		selectedStatus: null,
		placeholder: "Status",
	},
	{
		type: "select",
		field: "paymentStatus",
		value: "",
		selectItems: [
			{
				label: "Unbezahlt",
				value: "unpaid",
			},
			{
				label: "Teilbezahlt",
				value: "partial",
			},
			{
				label: "Bezahlt",
				value: "paid",
			},
		],
		selectedStatus: null,
		placeholder: "Zahlungsstatus",
	},
]);
