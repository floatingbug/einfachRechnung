export default function getSettingsItems({router}){
	const items = {
		label: "Einstellungen",
		items: [
			{
				id: "companySettings",
				label: "Firmendaten",
				icon: "pi pi-building",
				command: () => router.push("/settings/company"),
			},
			{
				id: "invoiceSettings",
				label: "Rechnungs Einstellungen",
				icon: "pi pi-file",
				command: () => router.push("/settings/invoice"),
			},
			{
				id: "taxSettings",
				label: "Steuer Einstellungen",
				icon: "pi pi-percentage",
				command: () => router.push("/settings/tax"),
			},
			{
				id: "emailSettings",
				label: "E-Mail Einstellungen",
				icon: "pi pi-envelope",
				command: () => router.push("/settings/email"),
			},
		],
	};

	return items;
}
