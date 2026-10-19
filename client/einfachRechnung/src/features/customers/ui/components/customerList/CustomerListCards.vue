<script setup>
import { CustomerCard } from '@/shared/components';


defineProps({
	customers: {
		type: Array,
		default: () => [],
	}
})


const emit = defineEmits([ "customerSelected" ]);

</script>


<template>
	<div class="customer-list-cards">
		<CustomerCard class="card--interactive"
			v-for="customer in customers"
			:key="customer._id"
			:customer="customer"
			@click="emit('customerSelected', customer.id)"
		/>

	</div>
</template>


<style lang="scss" scoped>
.customer-list-cards {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	justify-content: center;
	align-items: stretch;
	gap: var(--space-md);
}
</style>
