import {AppLayout} from "@/app/layouts";
import {
	CompanySettingsView,
	InvoiceSettingsView,
	EmailSettingsView,
	TaxSettingsView,
	OfferSettingsView,
} from "../ui/views";


export default [
	{
		path: "/settings",
		component: AppLayout,
		meta: {
			breadcrumb: "Einstellungen",
			requiresAuth: true,
		},
		children: [
			{
				path: "company",
				component: CompanySettingsView,
				meta: {
					breadcrumb: "Firma"
				},
			},
			{
				path: "invoice",
				component: InvoiceSettingsView,
				meta: {
					breadcrumb: "Rechnung"
				},
			},
			{
				path: "tax",
				component: TaxSettingsView,
				meta: {
					breadcrumb: "Steuer"
				},
			},
			{
				path: "email",
				component: EmailSettingsView,
				meta: {
					breadcrumb: "E-Mail"
				},
			},
			{
				path: "offer",
				component: OfferSettingsView,
				meta: {
					breadcrumb: "Angebot"
				},
			},
		],
	},
];
