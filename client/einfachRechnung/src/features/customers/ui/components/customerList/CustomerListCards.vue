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
		<CustomerCard class="customer-card"
			v-for="customer in customers"
			:key="customer._id"
			:customer="customer"
			@click="emit('customerSelected', customer._id)"
		/>

	</div>
</template>


<style lang="scss" scoped>
.customer-list-cards {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
	gap: var(--space-md);
}

.customer-card {
	cursor: pointer;
}
</style>
