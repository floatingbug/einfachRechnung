import {AppLayout} from "@/app/layouts";
import OverviewView from "../views/OverviewView.vue";


export default [
	{
		path: "/",
		component: AppLayout,
		meta: {
			context: "dashboard",
		},
		children: [
			{
				path: "",
				component: OverviewView,
			},
		],
	},
];
