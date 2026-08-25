import {AppLayout} from "@/app/layouts";


export default [
	{
		path: "/invoice",
		component: AppLayout,
		meta: {
			context: "invoice",
			breadcrumb: "Rechnung",
			requiresAuth: true,
		},
		children: [
			{
				path: "",
				component: () => import("../ui/views/InvoiceListView.vue"),
				meta: {
					breadcrumb: "Liste"
				},
			},
			{
				path: "create",
				component: () => import("../ui/views/CreateInvoiceView.vue"),
				meta: {
					breadcrumb: "Erstellen"
				},
			},
			{
				path: ":invoiceNumber",
				name: "invoice-details",
				component: () => import("../ui/views/InvoiceView.vue"),
				meta: {
					breadcrumb: "Details",
				},
			},
			{
				path: "edit/:invoiceNumber",
				name: "invoice-edit",
				component: () => import("../ui/views/InvoiceEditView.vue"),
				meta: {
					breadcrumb: "Bearbeiten"
				},
			},
		],
	}
];
