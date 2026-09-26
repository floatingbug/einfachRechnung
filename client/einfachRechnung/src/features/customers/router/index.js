import { AppLayout } from "@/app/layouts";
import {
	CreateCustomerView,
	CustomersListView,
	CustomerDetailsView,
    EditCustomerView,
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
					breadcrumb: "Anlegen",
				},
			},
			{
				path: ":customerId",
				component: CustomerDetailsView,
				meta: {
					breadcrumb: "Details",
				},
			},
			{
				path: "edit/:customerId",
				component: EditCustomerView,
				meta: {
					breadcrumb: "Bearbeiten",
				},
			},
		],
	},
];
