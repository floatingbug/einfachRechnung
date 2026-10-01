<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCustomersStore } from "../../store";
import { CustomerListCards, CustomerListTable } from "../components";
import { PageContainer } from "@/shared/components";
import { Paginator } from "primevue";

const customersStore = useCustomersStore();
const router = useRouter();

const customers = ref();
const pagination = ref({});

onMounted(() => {
	getCustomers();
});

const onPageChange = async (event) => {
	const limit = event.rows;
	const page = event.page;

	getCustomers({
		limit,
		page,
	});
};


async function getCustomers({limit, page} = {}){
    try {
		const result = await customersStore.getCustomers({
			limit: limit ?? 10,
			page: page ?? 0,
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
        <CustomerListTable
            class="customer-list-table"
            :customers="customers"
            @customerSelected="router.push(`/customers/${$event}`)"
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

@include media.up(1860px){
	.customer-list-table {
		display: unset;
	}

	.customer-list-cards {
		display: none;
	}
}
</style>
