export default function getInvoiceItems({router}){
	const items = {
		label: "Rechnung",
		items: [
			{
				id: "invoiceList",
				label: "Übersicht",
				icon: "pi pi-list",
				command: () => router.push("/invoice"),
			},
			{
				id: "invoiceCreate",
				label: "Schnelle Rechnung",
				icon: "pi pi-bolt",
				command: () => router.push("/invoice/create"),
			},
		]
	}

	return items;
}
