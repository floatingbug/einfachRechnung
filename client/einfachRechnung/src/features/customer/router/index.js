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
		},
		children: [
			{
				path: "",
				component: CustomersListView,
			},
			{
				path: "create",
				component: CreateCustomerView,
			},
		],
	},
];
