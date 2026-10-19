import {ref} from "vue";


export const offerItems = ref([
	{
		type: "text",
		label: "Angebotsnummer",
		field: "offerNumber",
		value: "",
	},
	{
		type: "text",
		label: "Kunde",
		field: "customerName",
		value: "",
	},
	{
		type: "select",
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
				label: "Angenommern",
				value: "accepted",
			},
			{
				label: "Abgelehnt",
				value: "rejected"
			},
			{
				label: "Abgelaufen",
				value: "expired",
			},
			{
				label: "Storniert",
				value: "canceled"
			},
		],
		field: "status",
		value: "",
		selectedStatus: null,
		placeholder: "Status"
	},
]);
