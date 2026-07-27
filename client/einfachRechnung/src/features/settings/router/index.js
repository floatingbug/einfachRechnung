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
		children: [
			{
				path: "company",
				component: CompanySettingsView,
			},
			{
				path: "invoice",
				component: InvoiceSettingsView,
			},
			{
				path: "tax",
				component: TaxSettingsView,
			},
			{
				path: "email",
				component: EmailSettingsView,
			},
			{
				path: "offer",
				component: OfferSettingsView,
			},
		],
	},
];
