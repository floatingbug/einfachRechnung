<script setup>
import {Card} from "primevue";
import {formatCurrency} from "@/shared/helpers"


defineProps({
	invoices: {
		type: Array,
		default: () => [],
	}
});


const emit = defineEmits([ "invoiceSelected" ]);

</script>


<template>
	<div class="invoice-cards">
		<Card class="card"
			v-for="(item, index) in invoices"
			:key="index"
			@click="emit('invoiceSelected', item.invoiceNumber)"
		>
			<template #title>
				{{item.invoiceNumber}}
			</template>

			<template #subtitle>
				<Divider />
			</template>

			<template #content>
				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Erstellt
						</div>

						<div class="item-value">
							{{item.invoiceDate}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Fällig bis
						</div>

						<div class="item-value">
							{{item.dueDate}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Betrag
						</div>

						<div class="item-value">
							{{formatCurrency(item.grossTotal)}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Status
						</div>

						<div class="item-value">
							{{item.status}}
						</div>
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>


<style lang="scss" scoped>
.invoice-cards {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	justify-content: center;
	justify-items: center;
	gap: var(--space-md);
}

.card {
	width: 100%;
	max-width: 300px;
	min-height: 300px;
	cursor: pointer;
	transition:
		transform 0.15s ease,
		box-shadow 0.15s ease;
}

.card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px var(--p-primary-color);
}
</style>
