<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { FilterMatchMode } from "@primevue/core/api";
import {formatCurrency} from "@/shared/helpers";

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
const statuses = [
	{
		label: "Entwurf",
		value: "draft",
	},
	{
		label: "Gesendet",
		value: "sent",
	},
	{
		label: "Angenommen",
		value: "accepted",
	},
	{
		label: "Abgelehnt",
		value: "rejected",
	},
	{
		label: "Abgelaufen",
		value: "expired",
	},
];

const filters = ref({
	offerNumber: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	customerName: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	status: {
		value: null,
		matchMode: FilterMatchMode.EQUALS,
	},
});

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
		v-model:filters="filters"
		:value="items"
		size="large"
		filterDisplay="row"
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
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Angebotsnummer suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="customerName"
			header="Kunde"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Kunde suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>

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
			<template #body="{data}">
				{{formatCurrency(data.totals.totalGross)}}
			</template>
		</Column>

		<Column
			field="status"
			header="Status"
			sortable
			:showFilterMenu="false"
		>
			<template #body="{ data }">
				{{ offerStatusMap[data.status] }}
			</template>

			<template #filter="{ filterModel, filterCallback }">
				<Select
					v-model="filterModel.value"
					:options="statuses"
					optionLabel="label"
					optionValue="value"
					placeholder="Status"
					:showClear="true"
					class="w-full"
					@change="filterCallback()"
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
