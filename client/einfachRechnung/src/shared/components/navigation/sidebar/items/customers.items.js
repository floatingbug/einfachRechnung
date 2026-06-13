export default function getInvoiceItems({router}){
	const items = {
		label: "Kunden",
		items: [
			{
				id: "customerList",
				label: "Kunden Liste",
				icon: "pi pi-list",
				command: () => router.push("/customer"),
			},
			{
				id: "createCustomer",
				label: "Kunde Hinzufügen",
				icon: "pi pi-user",
				command: () => router.push("/customer/create"),
			},
		]
	};

	return items;
}
