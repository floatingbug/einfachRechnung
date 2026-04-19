export default function getSidebarItems({context}){
	let items = [];

	if(context === "dashboard"){
		items = [
			{
				id: "invoiceList",
				label: "InvoiceList",
				icon: "pi pi-list",
				to: "/invoice",
			},
		];
	}

	if(context === "invoice"){
		items = [
			{
				id: "invoiceList",
				label: "Invoice List",
				icon: "pi pi-list",
				to: "/invoice",
			},
			{
				id: "invoiceCreate",
				label: "Create Invoice",
				icon: "",
				to: "/invoice/create",
			},
		];
	}

	items.unshift(
		{
			id: "overview",
			label: "Overview",
			icon: "pi pi-home",
			to: "/",
		}
	);

	return items;
}
