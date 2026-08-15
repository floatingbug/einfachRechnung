import {AppLayout} from "@/app/layouts";


export default [
	{
		path: "/offer",
		component: AppLayout,
		meta: {
			breadcrumb: "Angebote",
			requiresAuth: true,
		},
		children: [
			{
				path: "create",
				component: () => import("../ui/views/CreateOfferView.vue"),
				meta: {
					breadcrumb: "Erstellen",
				},
			},
			{
				path: "list",
				component: () => import("../ui/views/OfferListView.vue"),
				meta: {
					breadcrumb: "Liste",
				},
			},
			{
				path: "details/:offerNumber",
				name: "offer-details",
				component: () => import("../ui/views/OfferDetailsView.vue"),
				meta: {
					breadcrumb: "Details",
				},
			},
			{
				path: "edit/:offerNumber",
				component: () => import("../ui/views/EditOfferView.vue"),
				meta: {
					breadcrumb: "Bearbeiten",
				},
			}
		],
	},
];
