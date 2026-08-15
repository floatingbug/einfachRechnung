import {AppLayout} from "@/app/layouts";
import CreateCustomerView from "../ui/views/CreateCustomerView.vue";
import CustomersListView from "../ui/views/CustomersListView.vue";


export default [
	{
		path: "/customer",
		component: AppLayout,
		meta: {
			context: "customer",
			requiresAuth: true,
			breadcrumb: "Kunden",
		},
		children: [
			{
				path: "",
				component: CustomersListView,
				meta: {
					breadcrumb: "Liste"
				},
			},
			{
				path: "create",
				component: CreateCustomerView,
				meta: {
					breadcrumb: "Erstellen"
				},
			},
		],
	},
];
