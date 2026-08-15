<script setup>
import {formatCurrency} from "../../helpers";


const props = defineProps({
	totals: {
		type: Object,
		required: true,
	}
});

</script>


<template>
	<div class="totals-items" v-if="totals">
		<div class="item">
			<div class="label">
				Zwischenzumme
			</div>

			<div class="value">
				{{formatCurrency(totals.subtotalNet)}}
			</div>
		</div>

		<div class="item">
			<div class="label">
				Rabatt
			</div>

			<div class="value">
				{{formatCurrency(totals.discountNet)}}
			</div>
		</div>

		<Divider type="dotted" />

		<div class="tax-breakdown">
			<div class="tax-breakdown-item"
				v-for="(item, index) in totals.taxBreakdown"
				:key="index"
			>
				<div class="item">
					<div class="label">
						Netto ({{item.taxRate}})
					</div>

					<div class="value">
						{{formatCurrency(item.netAmount)}}
					</div>
				</div>

				<div class="item">
					<div class="label">
						MwSt. ({{item.taxRate}})
					</div>

					<div class="value">
						{{formatCurrency(item.taxAmount)}}
					</div>
				</div>
			</div>
		</div>

		<Divider type="dotted" />

		<div class="item">
			<div class="label">
				Gesamt netto
			</div>

			<div class="value">
				{{formatCurrency(totals.totalNet)}}
			</div>
		</div>

		<div class="item">
			<div class="label">
				Gesamt MwSt.
			</div>

			<div class="value">
				{{formatCurrency(totals.totalTax)}}
			</div>
		</div>

		<div class="item">
			<div class="label">
				Gesamt brutto
			</div>

			<div class="value">
				{{formatCurrency(totals.totalGross)}}
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.totals-items {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.item {
	display: flex;
}

.label, value {
	flex: 1;
}

.tax-breakdown {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}
</style>
