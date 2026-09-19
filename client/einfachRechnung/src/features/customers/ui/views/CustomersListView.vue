<script setup>
import {ref, onMounted}  from "vue";
import {useRouter} from "vue-router"
import {useCustomersStore} from "../../store";
import {CustomerListCards, CustomerListTable} from "../components";
import { PageContainer } from "@/shared/components";


const customersStore = useCustomersStore();
const router = useRouter();
const customers = ref();


onMounted(async () => {
	customers.value = await customersStore.getCustomers();
})

</script>


<template>
	<PageContainer>
		<CustomerListTable class="customer-list-table"
			:customers="customers"
			@customerSelected="router.push(`/customers/${$event}`)"
		/>

		<CustomerListCards class="customer-list-cards"
			:customers="customers"
			@customerSelected="router.push(`/customers/${$event}`)"
		/>
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
