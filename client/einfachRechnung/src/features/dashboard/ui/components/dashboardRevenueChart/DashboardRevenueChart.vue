<script setup>
import { computed } from "vue";
import Card from "primevue/card";
import Chart from "primevue/chart";
import { useFormatters } from "../../../composables/useFormatters";
import { useChartColors } from "../../../composables/useChartColors";

/**
 * Erwartet store.revenueByMonth:
 * [{ month: "2026-10", invoicedGross: 589.05, paidGross: 0 }, ...]
 */
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
});

const { formatCurrency, formatCurrencyShort, formatMonthShort, formatMonthLong } =
	useFormatters();
const colors = useChartColors();

const hasData = computed(() =>
	props.data.some((item) => item.invoicedGross > 0 || item.paidGross > 0)
);

const chartData = computed(() => ({
	labels: props.data.map((item) => formatMonthShort(item.month)),
	datasets: [
		{
			label: "Fakturiert",
			data: props.data.map((item) => item.invoicedGross),
			backgroundColor: colors.value.invoiced,
			borderRadius: 4,
			maxBarThickness: 24,
		},
		{
			label: "Bezahlt",
			data: props.data.map((item) => item.paidGross),
			backgroundColor: colors.value.paid,
			borderRadius: 4,
			maxBarThickness: 24,
		},
	],
}));

const chartOptions = computed(() => ({
	responsive: true,
	maintainAspectRatio: false,
	interaction: { mode: "index", intersect: false },
	plugins: {
		legend: {
			position: "top",
			align: "end",
			labels: { color: colors.value.text, usePointStyle: true, boxWidth: 8 },
		},
		tooltip: {
			callbacks: {
				// "Oktober 2026" statt nur "Okt"
				title: ([item]) => formatMonthLong(props.data[item.dataIndex].month),
				label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`,
			},
		},
	},
	scales: {
		x: {
			ticks: { color: colors.value.muted, maxRotation: 0, autoSkip: true },
			grid: { display: false },
		},
		y: {
			beginAtZero: true,
			ticks: {
				color: colors.value.muted,
				callback: (value) => formatCurrencyShort(value),
			},
			grid: { color: colors.value.border },
			border: { display: false },
		},
	},
}));
</script>

<template>
	<Card class="revenue-chart">
		<template #title>Umsatz pro Monat (brutto)</template>

		<template #content>
			<p v-if="!hasData" class="revenue-chart__empty">
				Noch keine versendeten Rechnungen in diesem Zeitraum.
			</p>

			<Chart
				v-else
				type="bar"
				:data="chartData"
				:options="chartOptions"
				class="revenue-chart__canvas"
			/>
		</template>
	</Card>
</template>

<style scoped>
/* Wichtig in Grid/Flex: ohne min-width: 0 schrumpft die Karte nicht unter die Canvas-Breite */
.revenue-chart {
	min-width: 0;
}

/* Container hat eine feste Größe; der Canvas liegt außerhalb des Layout-Flusses,
   damit er die Breite der Eltern nicht festhält und Chart.js live mitschrumpfen kann */
.revenue-chart__canvas {
	position: relative;
	width: 100%;
	height: 18rem;
}

.revenue-chart__canvas :deep(canvas) {
	position: absolute;
	inset: 0;
}

.revenue-chart__empty {
	height: 18rem;
}

.revenue-chart__empty {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	color: var(--p-text-muted-color);
}
</style>
