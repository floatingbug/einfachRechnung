<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCustomersStore } from "../../store";
import { CustomerListCards, CustomerListTable } from "../components";
import { PageContainer, Filter } from "@/shared/components";
import { Paginator } from "primevue";
import {filterItems} from "../items";

const router = useRouter();
const customersStore = useCustomersStore();

const customers = ref();
const pagination = ref({});
let filter;
let sort;

onMounted(() => {
	getCustomers();
});

const onPageChange = async (event) => {
	const limit = event.rows;
	const page = event.page;

	getCustomers({
		limit,
		page,
		sort,
		filter,
	});
};

function onUpdateSort($event){
	if(!$event.sortField) return sort = null;

	sort = $event;

	getCustomers({
		limit: pagination.limit,
		page: pagination.page,
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
		limit: pagination.limit,
		page: pagination.page,
		sort,
		filter,
	});
}


async function getCustomers({limit, page, sort, filter} = {}){
    try {
		const result = await customersStore.getCustomers({
			limit: limit ?? 10,
			page: page ?? 0,
			sort: sort ?? null,
			filter: filter ?? null,
		});

        customers.value = result.customers;
        pagination.value = result.pagination;
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <PageContainer>
		<Filter
			:items="filterItems"
			@update:filter="onUpdateFilter({field: $event.field, value: $event.value})"
		/>

		<CustomerListTable
			class="customer-list-table"
			:customers="customers"
			@customerSelected="router.push(`/customers/${$event}`)"
			@update:sort="onUpdateSort"
		/>

		<CustomerListCards
			class="customer-list-cards"
			:customers="customers"
			@customerSelected="router.push(`/customers/${$event}`)"
		/>

		<template #paginator>
			<Paginator
				:rows="pagination.limit"
				:totalRecords="pagination.total"
				:rowsPerPageOptions="[10, 20, 30]"
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
}

.customer-list-cards {
	margin-top: var(--space-xl);
}

@include media.up(1353px){
	.customer-list-table {
		display: unset;
	}

	.customer-list-cards {
		display: none;
	}
}
</style>
