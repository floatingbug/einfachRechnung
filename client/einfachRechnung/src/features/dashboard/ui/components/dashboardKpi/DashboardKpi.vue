<script setup>
import {DashboardKpiCard} from './components';
import { computed } from "vue";

const props = defineProps({
	kpis: {
		type: Object,
		default: () => ({}), // bei Objekten muss der Default eine Funktion sein
	},
});

// --- Formatierung (später in ein Composable wie useFormatters auslagern) ------
const currency = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
});

const percent = new Intl.NumberFormat("de-DE", {
	style: "percent",
	signDisplay: "exceptZero",
	maximumFractionDigits: 1,
});

const monthName = new Intl.DateTimeFormat("de-DE", { month: "long" }).format(
	new Date()
);

const plural = (count, singular, pluralForm) =>
	`${count} ${count === 1 ? singular : pluralForm}`;

// --- Items --------------------------------------------------------------------
// computed, damit sich die Karten aktualisieren, sobald die Daten geladen sind
const items = computed(() => {
	const k = props.kpis;

	const change =
		k.revenueChangePercent == null
			? "Kein Vergleichswert zum Vormonat"
			: `${percent.format(k.revenueChangePercent / 100)} zum Vormonat`;

	return [
		{
			key: "revenue",
			header: { label: `Umsatz ${monthName} (netto)`, color: "mono" },
			mainContent: { label: currency.format(k.revenueNetMonth ?? 0), color: "dark" },
			footer: { label: change, color: "primary" },
		},
		{
			key: "open",
			header: { label: "Offene Forderungen", color: "mono" },
			mainContent: { label: currency.format(k.openAmount ?? 0), color: "dark" },
			footer: {
				label: `${plural(k.openInvoiceCount ?? 0, "Rechnung", "Rechnungen")} unbezahlt`,
				color: "mono",
			},
		},
		{
			key: "overdue",
			header: { label: "Überfällig", color: (k.overdueAmount ?? 0) > 0 ? "danger" : "mono" },
			mainContent: {
				label: currency.format(k.overdueAmount ?? 0),
				color: (k.overdueAmount ?? 0) > 0 ? "danger" : "dark",
			},
			footer: {
				label: `${plural(k.overdueInvoiceCount ?? 0, "Rechnung", "Rechnungen")} nach Fälligkeit`,
				color: "mono",
			},
		},
		{
			key: "offers",
			header: { label: "Offene Angebote", color: "mono" },
			mainContent: { label: String(k.openOfferCount ?? 0), color: "dark" },
			footer: {
				label: `Volumen ${currency.format(k.openOfferVolumeNet ?? 0)} (netto)`,
				color: "mono",
			},
		},
	];
});

</script>


<template>
	<div class="kpis">
		<DashboardKpiCard
			v-for="item in items"
			:key="item.key"
			:item="item"
		/>
	</div>
</template>


<style lang="scss" scoped>
.kpis {
	width: 100%;
	display: grid;
	gap: var(--space-md);
	margin-top: var(--space-xl);
}

@media(width >= 473px) {
	.kpis {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media(width >= 1718px) {
	.kpis {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
