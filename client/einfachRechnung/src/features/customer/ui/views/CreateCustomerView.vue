<script setup>
import {onMounted} from "vue";
import CreateCustumerForm from "../components/CreateCustumerForm.vue";
import {useCustomerStore} from "../../store/useCustomerStore.js";


const customerStore = useCustomerStore();
customerStore.createDraftCustomer();


onMounted(async () => {
	await customerStore.getCustomers();
});

async function handleSubmit(){
	await customerStore.createCustomer();
}

</script>


<template>
	<div class="create-customer">
		<CreateCustumerForm v-if="customerStore.draftCustomer"
			@submit="handleSubmit"
		/>
	</div>
</template>


<style scoped lang="scss">
.create-customer {
	width: 100%;
	max-width: 800px;
	display: flex;
	align-items: center;
}
</style>
