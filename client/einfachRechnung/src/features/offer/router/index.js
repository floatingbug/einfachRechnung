import {AppLayout} from "@/app/layouts";
import CreateOfferView from "../ui/views/CreateOfferView.vue";


export default [
	{
		path: "/offer",
		component: AppLayout,
		children: [
			{
				path: "create",
				component: CreateOfferView,
			},
		],
	},
];
