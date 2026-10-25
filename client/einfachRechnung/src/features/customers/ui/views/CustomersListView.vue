<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCustomersStore } from "../../store";
import { CustomerListCards, CustomerListTable } from "../components";
import { PageContainer, Filter, ListEmptyState, ListErrorState } from "@/shared/components";
import { Paginator } from "primevue";
import { filterItems } from "../items";

const router = useRouter();
const customersStore = useCustomersStore();

const customers = ref([]);
const pagination = ref({});
const isLoading = ref(true);
const error = ref(null);
const currLimit = ref(10);
const currPage = ref(0);
let filter;
let sort;

const hasCustomers = computed(() => customers.value.length > 0);

onMounted(() => {
	getCustomers();
});

const onPageChange = async (event) => {
	getCustomers({
		limit: event.rows,
		page: event.page,
		sort,
		filter,
	});
};

function onUpdateSort($event){
	if(!$event.sortField) return sort = null;

	sort = $event;

	getCustomers({
		limit: currLimit.value,
		page: currPage.value,
		sort,
		filter,
	});
}

function onUpdateFilter({field, value}){
	const item = filterItems.value.find(i => i.field === field);
	item.value = value;

	const itemsWithValues = filterItems.value.filter(i => i.value !== "");

	filter = itemsWithValues.map(item => {
		if(item.value){
			return {
				field: item.field,
				value: item.value,
			};
		}
	})

	if(filter.length <= 0) filter = null;

	getCustomers({
		limit: currLimit.value,
		page: 0,
		sort,
		filter,
	});
}

// Filter.vue already cleared the inputs, reload without any filter.
function onResetFilter(){
	filter = null;

	getCustomers({
		limit: currLimit.value,
		page: 0,
		sort,
		filter,
	});
}


async function getCustomers({limit, page, sort, filter} = {}){
	isLoading.value = true;
	error.value = null;

	currLimit.value = limit ?? currLimit.value;
	currPage.value = page ?? 0;

    try {
		const result = await customersStore.getCustomers({
			limit: currLimit.value,
			page: currPage.value,
			sort: sort ?? null,
			filter: filter ?? null,
		});

        customers.value = result.customers;
        pagination.value = result.pagination;
    } catch (err) {
        customers.value = [];
        error.value = err?.message ?? null;
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <PageContainer :is-loading="isLoading && !hasCustomers && !error">
		<ListErrorState
			v-if="error"
			:message="error"
			@retry="getCustomers({ sort, filter })"
		/>

		<template v-else>
			<Filter
				:items="filterItems"
				@update:filter="onUpdateFilter({field: $event.field, value: $event.value})"
				@reset="onResetFilter"
			/>

			<ListEmptyState
				v-if="!isLoading && !hasCustomers"
				title="Keine Kunden gefunden"
				message="Legen Sie einen neuen Kunden an oder passen Sie die Filter an."
				action-label="Neuer Kunde"
				@action="router.push('/customers/create')"
			/>

			<template v-else-if="hasCustomers">
				<CustomerListTable
					class="customer-list-table"
					:customers="customers"
					:loading="isLoading"
					@customerSelected="router.push(`/customers/${$event}`)"
					@update:sort="onUpdateSort"
				/>

				<CustomerListCards
					class="customer-list-cards"
					:customers="customers"
					@customerSelected="router.push(`/customers/${$event}`)"
				/>
			</template>
		</template>

		<template #paginator>
			<Paginator
				v-if="!error && pagination.total > 0"
				:first="currPage * currLimit"
				:rows="currLimit"
				:totalRecords="pagination.total"
				:rowsPerPageOptions="[10, 20, 50, 100]"
				@page="onPageChange"
			/>
		</template>
    </PageContainer>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;


.customer-list-table {
	display: none;
	margin-top: var(--space-xl);
}

.customer-list-cards {
	margin-top: var(--space-xl);
}

@include media.up(bp.$bp-xl){
	.customer-list-table {
		display: unset;
	}

	.customer-list-cards {
		display: none;
	}
}
</style>
