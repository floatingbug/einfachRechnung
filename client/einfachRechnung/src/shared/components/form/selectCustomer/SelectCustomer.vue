<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Select from 'primevue/select'
import { useCustomersStore } from '@/features/customers/store/';

const customersStore = useCustomersStore()
const customers = ref([])
const customerId = ref()

const customerOptions = computed(() => {
	return customers.value.map((customer) => ({
		...customer,
		label:
			customer.customerType === "private"
				? `${customer.firstName} ${customer.lastName}`.trim()
				: customer.companyName,
	}));
});

const emit = defineEmits(['customerSelected'])

onMounted(async () => {
	customers.value = await customersStore.getCustomers()
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
		optionValue="id"
		placeholder="Kunde Auswählen"
		filter
		showClear
		fluid
	/>
</template>
