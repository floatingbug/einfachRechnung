import { AppLayout } from "@/app/layouts";
import {
	CreateCustomerView,
	CustomersListView,
	CustomerDetailsView,
} from "../ui/views";

export default [
	{
		path: "/customers",
		component: AppLayout,
		meta:{
			breadcrumb: "Kunden",
			requiresAuth: true,
		},
		children: [
			{
				path: "",
				component: CustomersListView,
				meta: {
					breadcrumb: "Kundenliste",
				},
			},
			{
				path: "create",
				component: CreateCustomerView,
				meta: {
					breadcrumb: "Kunde anlegen",
				},
			},
			{
				path: ":customerId",
				component: CustomerDetailsView,
				meta: {
					breadcrumb: "Kunden Details",
				},
			},
		],
	},
];
