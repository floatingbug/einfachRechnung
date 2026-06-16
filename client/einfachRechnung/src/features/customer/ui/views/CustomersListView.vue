<script setup>
import {ref} from "vue";
import CustomersList from "../components/CustomersList.vue";
import CustomerModal from "../components/CustomerModal.vue";
import CustomerDetails from "../components/CustomerDetails.vue";
import {useCustomerStore} from "../../store/useCustomerStore.js";


const customerStore = useCustomerStore();
const isCustomerModalOpen = ref(false);


function onCustomersListAction(event){
	switch(event.action){
		case "openCustomer" :
			customerStore.selectCustomer({
				customerId: event.customerId,
			});

			isCustomerModalOpen.value = true;
		break;
	}
}

</script>


<template>
	<CustomersList
		@customersList:action="onCustomersListAction"
	/>

	<CustomerModal
		v-model="isCustomerModalOpen"
	>
		<CustomerDetails />
	</CustomerModal>
</template>


<style scoped lang="scss">

</style>
