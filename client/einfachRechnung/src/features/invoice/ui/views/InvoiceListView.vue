<script setup>
import {ref, onMounted} from "vue";
import useInvoiceStore from "../../store/useInvoiceStore.js";
import {InvoiceList} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";
import {PageContainer} from "@/shared/components";

const router = useRouter();
const invoiceStore = useInvoiceStore();
const isInitializing = ref(true);
const PAGINATION_LIMIT = 10;


onMounted(async () => {
	try{
		await invoiceStore.getInvoices({limit: PAGINATION_LIMIT});
	}
	catch {
		invoiceStore.invoices = [];
	}

	isInitializing.value = false;
});

// --- event handler ---
async function onPaginationAction(event){
	await invoiceStore.getInvoices({
		limit: event.rows,
		page: event.page +1,
	});
}

function onInvoiceListActions(event){
	if(event.action === "openInvoice"){
		router.push({name: "invoice-details", params: {invoiceId: event.invoiceId}});
	}
}
</script>


<template>
	<PageContainer>
		<div class="invoice-list" v-if="!isInitializing">
			<InvoiceList
				:items="invoiceStore.invoiceTableItems"
				@action="onInvoiceListActions"
			/>

			<Paginator v-if="invoiceStore.pagination"
				:rows="PAGINATION_LIMIT"
				:totalRecords="invoiceStore.pagination.total"
				:rowsPerPageOptions="[10, 20, 50, 100]"
				@page="onPaginationAction"
			/>

		</div>
	</PageContainer>
</template>


<style scoped lang="scss">
.invoice-list {
	width: 100%;
	min-width: 0;
	height: 100dvh;
	display: grid;
	grid-template-rows: auto 1fr;
}
</style>
