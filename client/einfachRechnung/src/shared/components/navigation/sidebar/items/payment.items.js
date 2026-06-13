export default function getPaymentItems({router}){
	const items = {
		label: "Zahlungen",
		items: [
			{
				id: "paymentList",
				label: "Zahlungs Übersicht",
				icon: "pi pi-wallet",
				command: () => router.push("/payment"),
			},
			{
				id: "openInvoices",
				label: "Offene Rechnungen",
				icon: "pi pi-clock",
				command: () => router.push("/payment/open"),
			},
			{
				id: "dunning",
				label: "Mahnungen",
				icon: "pi pi-bell",
				command: () => router.push("/payment/dunning"),
			},
		],
	};

	return items;
}
