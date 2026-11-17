<script setup>
import {Card, Tag} from "primevue";
import {formatCurrency, formatDate} from "@/shared/helpers"
import {getInvoiceStatus} from "@/features/invoice/ui/items/statusItems"


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
		<Card class="card card--interactive"
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
							Rechnungsdatum
						</div>

						<div class="item-value">
							{{formatDate(item.invoiceDate)}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Fällig bis
						</div>

						<div class="item-value">
							{{formatDate(item.dueDate)}}
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
							<Tag
								:value="getInvoiceStatus(item.status).label"
								:severity="getInvoiceStatus(item.status).severity"
								rounded
							/>
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
</style>
