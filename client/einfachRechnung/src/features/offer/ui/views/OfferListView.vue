<script setup>
import {ref, onMounted} from "vue";
import {useOfferStore} from "../../store";
import {OfferList, OfferCard} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";
import {PageContainer, Filter} from "@/shared/components";
import {offerItems} from "../items"


const router = useRouter();
const offerStore = useOfferStore();
const isInitializing = ref(true);
const totalRecords = ref();
const items = ref([]);
let activeFilters = {};
let currPage = 0;
let currLimit = 10;


onMounted(async () => {
	try{
		const getOffersResult = await offerStore.getOffers({
			limit: currLimit,
			page: currPage,
		});

		items.value = getOffersResult.items;
		totalRecords.value = getOffersResult.pagination.total;
	}
	catch {
		items.value = [];
	}

	isInitializing.value = false;
});

// --- event handler ---
async function onPaginationAction(event){
	currLimit = event.rows;
	currPage = event.page;

	const getOffersResult = await offerStore.getOffers({
		limit: currLimit,
		page: currPage,
		filter: activeFilters,
	});

	items.value = getOffersResult.items;
	totalRecords.value = getOffersResult.pagination.total;
}

function openOfferDetails(offerNumber){
	router.push(`/offer/details/${offerNumber}`);
}

async function onUpdateFilter({field, value}){
	const item = offerItems.value.find(item => item.field === field);

	item.value = value;

	activeFilters = offerItems.value
		.filter(item => item.value && item.field)
		.map(item => {
			return {
				field: item.field,
				value: item.value,
			};
		});

	currPage = 0;

	console.log(activeFilters);

	const getOffersResult = await offerStore.getOffers({
		limit: currLimit,
		page: currPage,
		filter: activeFilters,
	});

	items.value = getOffersResult.items;
	totalRecords.value = getOffersResult.pagination.total;
}

</script>


<template>
	<PageContainer>
		<div class="offer-list" v-if="!isInitializing">
			<Filter
				:items="offerItems"
				@update:filter="onUpdateFilter({field: $event.field, value: $event.value})"
			/>

			<OfferList class="offer-list-data-table"
				:items="items"
				@action="openOfferDetails($event.offerNumber)"
			/>

			<div class="offer-list-cards">
				<OfferCard
					v-for="offer in items" :key="offer.offerNumber"
					:offer="offer"
					@action="openOfferDetails($event.offerNumber)"
				/>
			</div>

			<Paginator v-if="items.length >= 10"
				:rows="PAGINATION_LIMIT"
				:totalRecords="totalRecords"
				:rowsPerPageOptions="[10, 20, 50, 100]"
				@page="onPaginationAction"
			/>
		</div>
	</PageContainer>
</template>


<style scoped lang="scss">
.offer-list {
	width: 100%;
	min-width: 0;
	display: grid;
	grid-template-rows: 1fr auto;
}

.offer-list-data-table {
	display: none;
}

.offer-list-cards {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	justify-items: center;
	gap: var(--space-md);
	margin: var(--space-xl) 0 var(--space-xl) 0;
}

@media (min-width: 1586px) {
	.offer-list-data-table {
		display: block;
	}

	.offer-list-cards {
		display: none;
	}

}
</style>
