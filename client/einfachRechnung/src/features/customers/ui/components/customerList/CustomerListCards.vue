<script setup>
import { CustomerCard } from '@/shared/components';


defineProps({
	customers: {
		type: Array,
		default: () => [],
	}
})


const emit = defineEmits([ "customerSelected" ]);


function onKeyActivate(event, customerId){
	if(event.key !== "Enter" && event.key !== " ") return;

	event.preventDefault();
	emit("customerSelected", customerId);
}

</script>


<template>
	<div class="customer-list-cards">
		<div
			class="customer-list-cards__item"
			v-for="customer in customers"
			:key="customer._id"
			role="button"
			tabindex="0"
			@click="emit('customerSelected', customer.id)"
			@keydown="onKeyActivate($event, customer.id)"
		>
			<CustomerCard class="card--interactive"
				:customer="customer"
			/>
		</div>
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

.customer-list-cards__item {
	height: 100%;

	&:focus-visible {
		outline: 2px solid var(--font-color-primary);
		outline-offset: 2px;
		border-radius: var(--radius-md);
	}
}
</style>
