<script setup>
import {ref, computed, onMounted} from "vue";
import {useOfferStore} from "../../store";
import {OfferList, OfferCard} from "../components";
import Paginator from 'primevue/paginator';
import {useRouter} from "vue-router";
import {PageContainer, Filter, ListEmptyState, ListErrorState} from "@/shared/components";
import {offerItems} from "../items"


const router = useRouter();
const offerStore = useOfferStore();
const isLoading = ref(true);
const error = ref(null);
const totalRecords = ref(0);
const items = ref([]);
const currPage = ref(0);
const currLimit = ref(10);
let activeFilters = null;

const hasItems = computed(() => items.value.length > 0);


onMounted(() => {
	loadOffers();
});


async function loadOffers(){
	isLoading.value = true;
	error.value = null;

	try {
		const getOffersResult = await offerStore.getOffers({
			limit: currLimit.value,
			page: currPage.value,
			filter: activeFilters,
		});

		items.value = getOffersResult.items;
		totalRecords.value = getOffersResult.pagination.total;
	}
	catch (err) {
		items.value = [];
		totalRecords.value = 0;
		error.value = err?.message ?? null;
	}
	finally {
		isLoading.value = false;
	}
}

// --- event handler ---
async function onPaginationAction(event){
	currLimit.value = event.rows;
	currPage.value = event.page;

	await loadOffers();
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

	currPage.value = 0;

	await loadOffers();
}

// Filter.vue already cleared the inputs, reload without any filter.
async function onResetFilter(){
	activeFilters = null;
	currPage.value = 0;

	await loadOffers();
}

</script>


<template>
	<PageContainer :is-loading="isLoading && !hasItems && !error">
		<ListErrorState
			v-if="error"
			:message="error"
			@retry="loadOffers"
		/>

		<template v-else>
			<Filter
				:items="offerItems"
				@update:filter="onUpdateFilter({field: $event.field, value: $event.value})"
				@reset="onResetFilter"
			/>

			<ListEmptyState
				v-if="!isLoading && !hasItems"
				class="offer-list-empty"
				title="Keine Angebote gefunden"
				message="Erstellen Sie ein neues Angebot oder passen Sie die Filter an."
				action-label="Neues Angebot"
				@action="router.push('/offer/create')"
			/>

			<div v-else class="offer-list">
				<OfferList class="offer-list-data-table"
					:items="items"
					:loading="isLoading"
					@action="openOfferDetails($event.offerNumber)"
				/>

				<div class="offer-list-cards">
					<OfferCard
						v-for="offer in items" :key="offer.offerNumber"
						:offer="offer"
						@action="openOfferDetails($event.offerNumber)"
					/>
				</div>
			</div>
		</template>

		<template #paginator>
			<Paginator
				v-if="!error && totalRecords > 0"
				:first="currPage * currLimit"
				:rows="currLimit"
				:totalRecords="totalRecords"
				:rowsPerPageOptions="[10, 20, 50, 100]"
				@page="onPaginationAction"
			/>
		</template>
	</PageContainer>
</template>


<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.offer-list {
	width: 100%;
	min-width: 0;
	margin-top: var(--space-xl);
}

.offer-list-empty {
	margin-top: var(--space-xl);
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
}

@include media.up(bp.$bp-xl) {
	.offer-list-data-table {
		display: block;
	}

	.offer-list-cards {
		display: none;
	}
}
</style>
