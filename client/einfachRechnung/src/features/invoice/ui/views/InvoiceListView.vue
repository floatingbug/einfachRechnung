<script setup>
import {ref, onMounted} from "vue";
import useInvoiceStore from "../../store/useInvoiceStore.js";
import {InvoiceList} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";

const router = useRouter();
const invoiceStore = useInvoiceStore();
const isInitializing = ref(true);
const PAGINATION_LIMIT = 10;


onMounted(async () => {
	try{
		await invoiceStore.getInvoices({limit: PAGINATION_LIMIT});
	}
	catch(error){
		console.log(error);
	}

	isInitializing.value = false;
});

// --- event handler ---
async function onPaginationAction(event){
	const result = await invoiceStore.getInvoices({
		limit: event.rows,
		page: event.page +1,
	});
}

function onInvoiceListActions(event){
	if(event.action === "openInvoice"){
		router.push(`/${event.invoiceNumber}`);
	}
}
</script>


<template>
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
</template>


<style scoped lang="scss">
.invoice-list {
	width: 100%;
	min-width: 0;
	display: grid;
	grid-template-rows: 1fr auto;
}
</style>
