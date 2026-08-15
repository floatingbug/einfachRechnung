import {AppLayout} from "@/app/layouts";
import InvoiceView from "../ui/views/InvoiceView.vue";
import InvoiceListView from "../ui/views/InvoiceListView.vue";
import CreateInvoiceView from "../ui/views/CreateInvoiceView.vue";


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
				component: InvoiceListView,
				meta: {
					breadcrumb: "Liste"
				},
			},
			{
				path: "create",
				component: CreateInvoiceView,
				meta: {
					breadcrumb: "Erstellen"
				},
			},
		],
	}
];
