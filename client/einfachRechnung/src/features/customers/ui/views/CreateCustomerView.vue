<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import { PageContainer } from '@/shared/components';
import { useCustomersStore } from '../../store';
import {CreateCustomerForm} from "../components";
import {createCustomerRequest} from "../../entities";


const customersStore = useCustomersStore();
const router = useRouter();
const errors = ref();
const customer = ref(
	createCustomerRequest()
);


async function saveCustomer(){
	try {
		await customersStore.createCustomer({
			customer: customer.value,
		});

		router.push("/customers")
	}
	catch (error) {
		errors.value = error.response.data.error;
	}
}

</script>


<template>
	<PageContainer>
		<CreateCustomerForm
			v-model="customer"
			@saveCustomer="saveCustomer"
			:errors="errors"
		/>
	</PageContainer>
</template>


<style lang="scss" scoped>

</style>
