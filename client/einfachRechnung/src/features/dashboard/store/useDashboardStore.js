import { defineStore } from "pinia";
import actions from "./actions";

const useDashboardStore = defineStore("dashboard", {
	state: () => ({
		kpis: {},
		paymentStatus: {},
		recentInvoices: [],
		recentOffers: [],
		revenueByMonth: [],

		isLoading: false,
		error: null,
		loadedAt: null,
	}),

	actions,
});

export default useDashboardStore;
