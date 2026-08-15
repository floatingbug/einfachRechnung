<script setup>
import Card from "primevue/card";
import {formatCurrency} from "@/shared/helpers";


const props = defineProps({
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
	<div class="item-card"
	>
		<Card>
			<template #title>
				{{item.title}}
			</template>

			<template #content>
				<div class="items">
					<div class="item" v-if="item.description">
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

			<template #footer>
				<div class="footer-actions">
					<slot name="actions"/>
				</div>
			</template>
		</Card>
	</div>
</template>


<style lang="scss" scoped>
.items {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.item-total {
	font-weight: 600;
	font-size: 1.1rem;
	padding-top: var(--space-sm);
	border-top: 1px solid var(--surface-border);
}

.footer-actions {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-md);
	margin-top: var(--space-xl);
}
</style>
