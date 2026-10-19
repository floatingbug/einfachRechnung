export default function getInvoiceItems({router}){
	const items = {
		label: "Übersicht",
		items: [
			{
				id: "dashboard",
				label: "Übersicht",
				icon: "pi pi-th-large",
				command: () => router.push("/"),
			},
		]
	};

	return items;
}
