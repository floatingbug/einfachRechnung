import {AppLayout} from "@/app/layouts";
import InvoiceView from "../views/InvoiceView.vue";
import InvoiceListView from "../views/InvoiceListView.vue";
import CreateInvoiceView from "../views/CreateInvoiceView.vue";


export default [
	{
		path: "/invoice",
		component: AppLayout,
		children: [
			{
				path: "",
				component: InvoiceListView,
				meta: {
					context: "invoice",
				},
			},
			{
				path: "create",
				component: CreateInvoiceView,
				meta: {
					context: "invoice",
				},
			},
		],
	}
];
