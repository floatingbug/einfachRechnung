<script setup>
import Card from "primevue/card";
import {formatCurrency} from "@/shared/helpers";


defineProps({
	item: {
		type: Object,
		required: true,
	},
	showTaxRatePerItem: {
		type: Boolean,
		default: false,
	}
});


// --- helpers ---
function getItemGrossTotal(item) {
	const lineNet = item.quantity * item.unitPrice;

	let discount = 0;

	if (item.discountType === "percentage") {
		discount = lineNet * item.discountValue / 100;
	} else if (item.discountType === "fixed") {
		discount = item.discountValue;
	}

	const netAfterDiscount = lineNet - discount;

	return netAfterDiscount * (1 + item.taxRate / 100);
}

</script>


<template>
	<Card class="item"
	>
		<template #title>
			{{item.title}}
		</template>

		<template #content>
			<div class="items">
				<div class="item-description" v-if="item.description">
					<div class="item-label">
						Beschreibung
					</div>

					<div class="item-value">
						{{item.description}}
					</div>
				</div>

				<div class="item">
					<div class="item-label">
						Menge
					</div>

					<div class="item-value">
						{{item.quantity}} {{item.unit}}
					</div>
				</div>

				<div class="item">
					<div class="item-label">
						Einzelpreis
					</div>

					<div class="item-value">
						{{formatCurrency(item.unitPrice)}}
					</div>
				</div>

				<div class="item">
					<div class="item-label">
						Rabatt
					</div>

					<div class="item-value">
						<span class="flex-align-center"
							v-if="item.discountValue && item.discountType === 'fixed'"
						>
							- {{formatCurrency(item.discountValue)}}
						</span>

						<span class="flex-align-center"
							v-if="item.discountType !== 'fixed' && item.discountValue"
						>
							- {{item.discountValue}} %
						</span>

						<span class="flex-align-center" v-if="!item.discountValue">
							-
						</span>
					</div>
				</div>

				<div class="item">
					<div class="item-label">
						MwSt.
					</div>

					<div class="item-value">
						{{item.taxRate}} %
					</div>
				</div>

				<div class="item item-total">
					<div class="item-label">
						Gesamt
					</div>

					<div class="item-value">
						{{
							formatCurrency(getItemGrossTotal(item))

						}}
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>


<style lang="scss" scoped>
.items {
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
	margin-top: var(--space-xl);
}

.item {
	display: flex;
}

.item-label {
	flex: 1;
	display: flex;
	align-items: center;
	gap: var(--space-xs);
}

.item-description {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.item-value {
	flex: 1;
	display: flex;
	align-items: center;
	gap: var(--space-xs);
}

.item-total {
	font-weight: 600;
	font-size: 1.1rem;
	padding-top: var(--space-sm);
	border-top: 1px solid var(--surface-border);
}

.flex-align-center {
	display: flex;
		align-items: center;
		gap: var(--space-xs);
}
</style>
