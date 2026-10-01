<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Select from 'primevue/select'
import { useCustomersStore } from '@/features/customers/store/';


const customersStore = useCustomersStore()
const customers = ref([])
const customerId = ref()
const emit = defineEmits(['customerSelected'])


const customerOptions = computed(() => {
	return customers.value.map((customer) => ({
		label:
			customer.customerType === "private"
				? `${customer.firstName} ${customer.lastName}`.trim()
				: customer.companyName,
		customerId: customer.id,
	}));
});


onMounted(async () => {
	const result = await customersStore.getCustomers()
	customers.value = result.customers;
})


watch(customerId, () => {
	const selectedCustomer = customers.value.find(
		(customer) => customer.id === customerId.value,
	)

	emit('customerSelected', selectedCustomer)
})
</script>

<template>
	<Select
		v-model="customerId"
		:options="customerOptions"
		optionLabel="label"
		optionValue="customerId"
		placeholder="Kunde"
		filter
		showClear
		fluid
	/>
</template>
