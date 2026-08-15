import {AppLayout} from "@/app/layouts";
import CreateOfferView from "../ui/views/CreateOfferView.vue";
import OfferDetailsView from "../ui/views/OfferDetailsView.vue";
import OfferListView from "../ui/views/OfferListView.vue";
import EditOfferView from "../ui/views/EditOfferView.vue";


export default [
	{
		path: "/offer",
		component: AppLayout,
		meta: {
			requiresAuth: true,
			breadcrumb: "Angebote",
			requiresAuth: true,
		},
		children: [
			{
				path: "create",
				component: CreateOfferView,
				meta: {
					breadcrumb: "Erstellen",
				},
			},
			{
				path: "list",
				component: OfferListView,
				meta: {
					breadcrumb: "Liste",
				},
			},
			{
				path: "details/:offerNumber",
				name: "offer-details",
				component: OfferDetailsView,
				meta: {
					breadcrumb: "Details",
				},
			},
			{
				path: "edit/:offerNumber",
				component: EditOfferView,
				meta: {
					breadcrumb: "Bearbeiten",
				},
			}
		],
	},
];
