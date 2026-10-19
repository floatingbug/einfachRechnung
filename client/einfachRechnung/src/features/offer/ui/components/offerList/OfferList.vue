<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { formatCurrency } from "@/shared/helpers";

defineProps({
	items: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(["action"]);

// --- status mapping (UI labels) ---
const offerStatusMap = {
	draft: "Entwurf",
	sent: "Gesendet",
	accepted: "Angenommen",
	rejected: "Abgelehnt",
	expired: "Abgelaufen",
};

// --- table setup ---
function onRowClick(event) {
	emit("action", {
		action: "openOffer",
		offerNumber: event.data.offerNumber,
	});
}
</script>

<template>
	<DataTable
		class="offer-list-data-table"
		:value="items"
		size="large"
		dataKey="id"
		rowHover
		:pt="{
			bodyRow: {
				style: {
					cursor: 'pointer',
				},
			},
		}"
		@rowClick="onRowClick"
	>
		<Column
			field="offerNumber"
			header="AngebotsNr."
			sortable
		/>

		<Column
			field="customerName"
			header="Kunde"
			sortable
		/>

		<Column
			field="offerDate"
			header="Angebotsdatum"
			sortable
		>
			<template #body="{ data }">
				{{ data.offerDate?.toLocaleDateString("de-DE") }}
			</template>
		</Column>

		<Column
			field="validUntil"
			header="Gültig bis"
			sortable
		>
			<template #body="{ data }">
				{{ data.validUntil?.toLocaleDateString("de-DE") }}
			</template>
		</Column>

		<Column
			field="totals.totalGross"
			header="Gesamtsumme (Brutto)"
			sortable
		>
			<template #body="{ data }">
				{{ formatCurrency(data.totals.totalGross) }}
			</template>
		</Column>

		<Column
			field="status"
			header="Status"
			sortable
		>
			<template #body="{ data }">
				{{ offerStatusMap[data.status] }}
			</template>
		</Column>
	</DataTable>
</template>

<style scoped lang="scss">
.offer-list-data-table {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--table-border-color);
}
</style>
