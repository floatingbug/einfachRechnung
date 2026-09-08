import { AppLayout } from "@/app/layouts";
import {
	CreateCustomerView,
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
				path: "create",
				component: CreateCustomerView,
				meta: {
					breadcrumb: "Kunde anlegen",
				},
			},
		],
	},
];
