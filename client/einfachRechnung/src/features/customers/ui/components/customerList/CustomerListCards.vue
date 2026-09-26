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
			@click="emit('customerSelected', customer._id)"
		/>

	</div>
</template>


<style lang="scss" scoped>
.customer-list-cards {
	width: 100%;
	display: grid;
	grid-template-columns: minmax(240px, 480px);
	justify-content: center;
	align-items: stretch;
	gap: var(--space-md);

	@media(width >= 1167px) {
		grid-template-columns: repeat(auto-fill, minmax(340px, 400px));
		justify-content: start;
	}
}
</style>
