export default function getOfferItems({router}){
	const items = {
		label: "Angebote",
		items: [
			{
				id: "offerList",
				label: "Angebots Liste",
				icon: "pi pi-list",
				command: () => router.push("/offer/list"),
			},
			{
				id: "createOffer",
				label: "Angebot Erstellen",
				icon: "pi pi-file-edit",
				command: () => router.push("/offer/create"),
			},
		],
	};

	return items;
}
