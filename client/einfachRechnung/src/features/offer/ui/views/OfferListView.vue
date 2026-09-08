<script setup>
import {ref, onMounted} from "vue";
import {useOfferStore} from "../../store";
import {OfferList, OfferCard} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";
import {PageContainer} from "@/shared/components";


const router = useRouter();
const offerStore = useOfferStore();
const isInitializing = ref(true);
const PAGINATION_LIMIT = 10;
const totalRecords = ref();
const items = ref([]);


onMounted(async () => {
	try{
		const getOffersResult = await offerStore.getOffers({
			limit: PAGINATION_LIMIT,
			page: 1,
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
	const getOffersResult = await offerStore.getOffers({
		limit: event.rows,
		page: event.page +1,
	});

	items.value = getOffersResult.items;
	totalRecords.value = getOffersResult.pagination.total;
}

function openOfferDetails(offerNumber){
	router.push(`/offer/details/${offerNumber}`);
}

</script>


<template>
	<PageContainer>
		<div class="offer-list" v-if="!isInitializing">
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

			<Paginator
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
	height: 100%;
	display: grid;
	grid-template-rows: 1fr auto;
	row-gap: var(--space-xl2);
}

.offer-list-data-table {
	display: none;
}

.offer-list-cards {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
	grid-template-rows: repeat(auto-fit, minmax(200px, max-content));
	justify-items: center;
	gap: var(--space-md);
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
