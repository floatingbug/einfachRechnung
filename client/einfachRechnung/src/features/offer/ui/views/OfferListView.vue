<script setup>
import {ref, onMounted} from "vue";
import {useOfferStore} from "../../store";
import {OfferList} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";

const router = useRouter();
const offerStore = useOfferStore();
const isInitializing = ref(true);
const PAGINATION_LIMIT = 10;
const totalRecords = ref();
const tableItems = ref([]);


onMounted(async () => {
	try{
		const getOffersResult = await offerStore.getOffers({
			limit: PAGINATION_LIMIT,
			page: 1,
		});

		tableItems.value = getOffersResult.items;
		totalRecords.value = getOffersResult.pagination.total;
	}
	catch(error){
		console.log(error);
	}

	isInitializing.value = false;
});

// --- event handler ---
async function onPaginationAction(event){
console.log(event);
	const getOffersResult = await offerStore.getOffers({
		limit: event.rows,
		page: event.page +1,
	});

	tableItems.value = getOffersResult.items;
	totalRecords.value = getOffersResult.pagination.total;
}

function onOfferListActions(event){
	if(event.action === "openOffer"){
		router.push(`/offer/details/${event.offerNumber}`);
	}
}
</script>


<template>
	<div class="offer-list" v-if="!isInitializing">
		<OfferList
			:items="tableItems"
			@action="onOfferListActions"
		/>

		<Paginator
			:rows="PAGINATION_LIMIT"
			:totalRecords="totalRecords"
			:rowsPerPageOptions="[10, 20, 50, 100]"
			@page="onPaginationAction"
		/>
	</div>
</template>


<style scoped lang="scss">
.offer-list {
	width: 100%;
	min-width: 0;
	display: grid;
	grid-template-rows: 1fr auto;
}
</style>
