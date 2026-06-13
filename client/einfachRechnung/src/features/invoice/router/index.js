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
		},
		children: [
			{
				path: "",
				component: InvoiceListView,
			},
			{
				path: "create",
				component: CreateInvoiceView,
			},
		],
	}
];
