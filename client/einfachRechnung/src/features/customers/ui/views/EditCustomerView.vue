<script setup>
import {onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router"
import { useCustomersStore } from "../../store";
import { PageContainer } from "@/shared/components";
import {EditCustomerForm} from "../components";
import { useToast } from 'primevue/usetoast';


const route = useRoute();
const customersStore = useCustomersStore();
const toast = useToast();


onMounted(async () => {
	getCustomer();
});

onUnmounted(() => {
	customersStore.customer = null;
});


//helpers
async function getCustomer(){
	if(!customersStore.customer){
		try {
			await customersStore.getCustomerById({
				customerId: route.params.customerId,
			})

		}
		catch (error) {
			toast.add(
				{
					severity: "error",
					summary: 'Fehler.',
					detail: error.response.data.errors,
					life: 5000
				}
			);
		}
	}
}


//handler
async function updateCustomer(){
	try {
		await customersStore.updateCustomer();

		toast.add(
			{
				severity: "info",
				summary: 'Geändert.',
				detail: "Kunde wurde geändert.",
				life: 5000
			}
		);
	} catch (error) {
		toast.add(
			{
				severity: "error",
				summary: 'Fehler.',
				detail: error.response.data.errors,
				life: 5000
			}
		);

	}
}

</script>


<template>
	<PageContainer>
		<EditCustomerForm
			:customer="customersStore.customer"
			@update:customer="customersStore.customer[$event.field] = $event.value"
			@submit="updateCustomer"
			@cancel="getCustomer"
		/>
	</PageContainer>
</template>


<style lang="scss" scoped>
</style>
