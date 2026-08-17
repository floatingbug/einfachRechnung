<script setup>
import {computed, onMounted, ref} from "vue";
import useInvoiceStore from "@/features/invoice/store/useInvoiceStore.js";
import {PageContainer} from "@/shared/components";

const invoiceStore = useInvoiceStore();
const loading = ref(true);
const error = ref("");

const openInvoices = computed(() => invoiceStore.invoices.filter(invoice => invoice.openAmount > 0 && invoice.status !== "cancelled"));
const overdueInvoices = computed(() => openInvoices.value.filter(invoice => invoice.dueDate && new Date(invoice.dueDate) < new Date()));
const openAmount = computed(() => openInvoices.value.reduce((sum, invoice) => sum + Number(invoice.openAmount || 0), 0));
const recentInvoices = computed(() => [...invoiceStore.invoices].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5));

onMounted(async () => {
	try {
		await invoiceStore.getInvoices({limit: 100, page: 1});
	}
	catch {
		error.value = "Dashboarddaten konnten nicht geladen werden.";
	}
	finally {
		loading.value = false;
	}
});

</script>


<template>
	<PageContainer>
		<section class="dashboard-overview">
			<h1>Übersicht</h1>
			<p v-if="loading">Lade Dashboard …</p>
			<p v-else-if="error">{{ error }}</p>
			<template v-else>
				<div class="metrics">
					<div><strong>{{ openInvoices.length }}</strong><span>offene Rechnungen</span></div>
					<div><strong>{{ overdueInvoices.length }}</strong><span>überfällige Rechnungen</span></div>
					<div><strong>{{ openAmount.toFixed(2) }} €</strong><span>offener Betrag</span></div>
				</div>
				<h2>Letzte Aktivitäten</h2>
				<ul>
					<li v-for="invoice in recentInvoices" :key="invoice.id">{{ invoice.invoiceNumber }} · {{ invoice.status }} · {{ invoice.paymentStatus }}</li>
				</ul>
			</template>
		</section>
	</PageContainer>
</template>


<style scoped lang="scss">
.metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: var(--space-lg); }
.metrics div { display: flex; flex-direction: column; padding: var(--space-lg); border: 1px solid var(--table-border-color); }
.metrics strong { font-size: 1.5rem; }
</style>
