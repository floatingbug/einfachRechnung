<script setup>
import { computed } from "vue";
import Card from "primevue/card";
import Divider from "primevue/divider";
import ProgressBar from "primevue/progressbar";
import { useFormatters } from "../../../composables/useFormatters";

/**
 * status:     store.paymentStatus  -> { paid, partial, unpaid, overdue }
 * vatQuarter: store.kpis.vatQuarter -> Umsatzsteuer im laufenden Quartal
 */
const props = defineProps({
	status: {
		type: Object,
		default: () => ({}),
	},
	vatQuarter: {
		type: Number,
		default: 0,
	},
});

const { formatCurrency } = useFormatters();

// Jede Rechnung zählt genau in einer Kategorie (Reihenfolge wie im Backend)
const STATUS_ITEMS = [
	{ key: "paid", label: "Bezahlt", color: "var(--p-green-500)" },
	{ key: "partial", label: "Teilweise bezahlt", color: "var(--p-orange-400)" },
	{ key: "unpaid", label: "Unbezahlt", color: "var(--p-surface-500)" },
	{ key: "overdue", label: "Überfällig", color: "var(--p-red-500)" },
];

const total = computed(() =>
	STATUS_ITEMS.reduce((sum, item) => sum + (props.status[item.key] ?? 0), 0)
);

const items = computed(() =>
	STATUS_ITEMS.map((item) => {
		const count = props.status[item.key] ?? 0;
		return {
			...item,
			count,
			percent: total.value > 0 ? (count / total.value) * 100 : 0,
		};
	})
);

const quarterLabel = computed(() => {
	const now = new Date();
	return `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`;
});
</script>

<template>
	<Card class="payment-status">
		<template #title>Zahlungsstatus</template>

		<template #content>
			<p v-if="total === 0" class="payment-status__empty">
				Noch keine versendeten Rechnungen.
			</p>

			<ul v-else class="payment-status__list">
				<li v-for="item in items" :key="item.key" class="payment-status__item">
					<div class="payment-status__row">
						<span>{{ item.label }}</span>
						<strong>{{ item.count }}</strong>
					</div>

					<ProgressBar
						:value="item.percent"
						:show-value="false"
						:aria-label="`${item.label}: ${item.count} von ${total} Rechnungen`"
						:pt="{ value: { style: { background: item.color } } }"
						class="payment-status__bar"
					/>
				</li>
			</ul>

			<Divider />

			<div class="payment-status__vat">
				<span class="payment-status__vat-label">
					Umsatzsteuer {{ quarterLabel }}
				</span>
				<span class="payment-status__vat-amount">
					{{ formatCurrency(vatQuarter) }}
				</span>
			</div>
		</template>
	</Card>
</template>

<style scoped>
.payment-status {
	min-width: 0;
}

.payment-status__list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.payment-status__row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.375rem;
	font-size: 0.875rem;
}

.payment-status__bar {
	height: 0.5rem;
}

.payment-status__empty {
	margin: 0;
	color: var(--p-text-muted-color);
}

.payment-status__vat {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.payment-status__vat-label {
	font-size: 0.8125rem;
	color: var(--p-text-muted-color);
}

.payment-status__vat-amount {
	font-size: 1.25rem;
	font-weight: 700;
}
</style>
