<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {PageContainer} from "@/shared/components";
import {useSettingsStore} from "@/features/settings/store/useSettingsStore";
import {useDashboardStore} from "../../store";
import {
	DashboardHeader,
	DashboardKpi,
	DashboardRevenueChart,
	DashboardPaymentStatus,
	DashboardRecentInvoices,
	DashboardRecentOffers,
	DashboardDocumentCardList,
} from "../components";


const settingsStore = useSettingsStore();
const dashboardStore = useDashboardStore();
const router = useRouter();


onMounted(async () => {
	await settingsStore.getCompany();
	await dashboardStore.getDashboard();

	console.log(dashboardStore.$state)

	if(dashboardStore.error){
		console.log(error);
	}
});

</script>


<template>
	<PageContainer>
		<div class="dashboard">
			<section>
				<DashboardHeader
					:company="settingsStore.company"
				/>
			</section>

			<section>
				<DashboardKpi
					:kpis="dashboardStore.kpis"
				/>
			</section>

			<section class="revenue-payments-charts">
				<DashboardRevenueChart class="revenue-chart"
					:data="dashboardStore.revenueByMonth"
				/>

				<DashboardPaymentStatus class="status-chart"
					:status="dashboardStore.paymentStatus"
					:vat-quarter="dashboardStore.kpis.vatQuarter"
				/>
			</section>

			<section class="recent-invoice-offers-tables">
				<DashboardRecentInvoices
					:invoices="dashboardStore.recentInvoices"
					@select="(invoice) => router.push(`/invoice/${invoice.invoiceNumber}`)"
					@view-all="router.push('/invoice')"
				/>

				<DashboardRecentOffers
					:offers="dashboardStore.recentOffers"
					@select="(offer) => router.push(`/offer/details/${offer.offerNumber}`)"
					@view-all="router.push('/offer/list')"
				/>
			</section>

			<section class="recent-invoice-offer-cards-list">
				<h3>Letzer Rechnungen</h3>

				<DashboardDocumentCardList
				type="invoice"
				:items="dashboardStore.recentInvoices"
				@select="(invoice) => router.push(`/invoice/${invoice.invoiceNumber}`)"
				/>

				<h3>Letzer Angebote</h3>

				<DashboardDocumentCardList
				type="offer"
				:items="dashboardStore.recentOffers"
				@select="(offer) => router.push(`/offer/details/${offer.offerNumber}`)"
				/>
			</section>
		</div>
	</PageContainer>
</template>


<style scoped lang="scss">
.dashboard {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.revenue-payments-charts {
	display: grid;

	@media (width >= 780px) {
		.revenue-chart {
			grid-area: revenueChart;
		}

		.status-chart {
			grid-area: statusChart;
		}

		grid-template-columns: repeat(5, 1fr);
		grid-template-areas:
			"revenueChart revenueChart revenueChart statusChart statusChart"
		;
	}
}

.recent-invoice-offers-tables {
	display: none;
}

@media (width >= 725px) {
	.recent-invoice-offers-tables {
		display: grid;
	}

	.recent-invoice-offer-cards-list {
		display: none;
	}
}

@media (width >= 1650px) {
	.recent-invoice-offers-tables {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
