<script setup>
import {onMounted} from "vue";
import { PageContainer } from '@/shared/components';
import { useCustomersStore } from '../../store';
import {CreateCustomerForm} from "../components";


const customersStore = useCustomersStore();


onMounted(async () => {
	try {
		await customersStore.getCustomerTemplate();
		console.log(customersStore.customer);
	}
	catch{
		console.log("Error. Reload")
	}
});

</script>


<template>
	<PageContainer>
		<CreateCustomerForm
			v-model="customersStore.customer"
		/>
	</PageContainer>
</template>


<style lang="scss" scoped>

</style>
