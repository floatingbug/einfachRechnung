import {AppLayout} from "@/app/layouts";
import OverviewView from "../views/OverviewView.vue";


export default [
	{
		path: "/",
		component: AppLayout,
		meta: {
			context: "dashboard",
			requiresAuth: true,
			breadcrumb: "Dashboard",
		},
		children: [
			{
				path: "",
				component: OverviewView,
				meta: {
					breadcrumb: "Übersicht",
				}
			},
		],
	},
];
