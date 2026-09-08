<script setup>
import {ref, onMounted} from "vue";
import useInvoiceStore from "../../store/useInvoiceStore.js";
import {InvoiceList} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";
import {PageContainer} from "@/shared/components";
import {createTableItems} from "../items/";

const router = useRouter();
const invoiceStore = useInvoiceStore();
const tableItems = ref();
const isInitializing = ref(true);
const PAGINATION_LIMIT = 10;


onMounted(async () => {
	try{
		await invoiceStore.getInvoices({limit: PAGINATION_LIMIT});
		tableItems.value = createTableItems(invoiceStore.invoices);
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

	tableItems.value = createTableItems(invoiceStore.invoices);
}

function onInvoiceListActions(event){
	if(event.action === "openInvoice"){
		router.push({name: "invoice-details", params: {invoiceNumber: event.invoiceNumber}});
	}
}
</script>


<template>
	<PageContainer>
		<div class="invoice-list" v-if="!isInitializing">
			<InvoiceList
				:items="tableItems"
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
	height: 100%;
	display: grid;
	row-gap: var(--space-md);
	grid-template-rows: 1fr auto;
}
</style>
