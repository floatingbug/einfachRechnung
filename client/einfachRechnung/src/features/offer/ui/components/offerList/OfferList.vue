<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { StatusTag } from "@/shared/components";
import { formatCurrency } from "@/shared/helpers";
import { getOfferStatus } from "../../items/statusItems.js";

defineProps({
	items: {
		type: Array,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["action"]);

// --- helpers ---
function formatAmount(value) {
	return value == null ? "-" : formatCurrency(value);
}

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
		:loading="loading"
		size="large"
		dataKey="id"
		rowHover
		stripedRows
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
			align="right"
		>
			<template #body="{ data }">
				{{ formatAmount(data.totals?.totalGross) }}
			</template>
		</Column>

		<Column
			field="status"
			header="Status"
			sortable
		>
			<template #body="{ data }">
				<StatusTag
					:label="getOfferStatus(data.status).label"
					:severity="getOfferStatus(data.status).severity"
				/>
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
