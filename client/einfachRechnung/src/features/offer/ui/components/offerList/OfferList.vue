<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Card from "primevue/card";
import { FilterMatchMode } from "@primevue/core/api";

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
			field="totalGross"
			header="Gesamtsumme (Brutto)"
			sortable
		/>

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

	<div class="offer-list-cards">
		<Card v-for="item in items" :key="item.id ?? item.offerNumber" class="offer-list-card" role="button" tabindex="0"
			@click="onRowClick({ data: item })" @keydown.enter="onRowClick({ data: item })" @keydown.space.prevent="onRowClick({ data: item })">
			<template #title>{{ item.offerNumber }}</template>
			<template #content><dl class="card-fields">
				<div class="card-field"><dt>Kunde</dt><dd>{{ item.customerName }}</dd></div>
				<div class="card-field"><dt>Angebotsdatum</dt><dd>{{ item.offerDate?.toLocaleDateString("de-DE") }}</dd></div>
				<div class="card-field"><dt>Gültig bis</dt><dd>{{ item.validUntil?.toLocaleDateString("de-DE") }}</dd></div>
				<div class="card-field"><dt>Gesamtsumme</dt><dd>{{ item.totalGross }}</dd></div>
				<div class="card-field"><dt>Status</dt><dd>{{ offerStatusMap[item.status] }}</dd></div>
			</dl></template>
		</Card>
	</div>
</template>

<style scoped lang="scss">
.offer-list-data-table {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--table-border-color);
}

.offer-list-cards {
	display: none;
}

@media (max-width: 767px) {
	.offer-list-data-table {
		display: none;
	}

	.offer-list-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: var(--space-md);
	}
}

.offer-list-card { cursor: pointer; transition: transform 160ms ease, box-shadow 160ms ease; }
.offer-list-card:hover { transform: translateY(-2px); box-shadow: var(--p-overlay-popover-shadow); }
.offer-list-card:focus-within { outline: 2px solid var(--p-focus-ring-color); outline-offset: 2px; }
.card-fields { display: grid; gap: var(--space-sm); margin: 0; }
.card-field { display: flex; justify-content: space-between; gap: var(--space-md); border-top: 1px solid var(--p-content-border-color); padding-top: var(--space-xs); }
dt { color: var(--p-text-muted-color); }
dd { margin: 0; font-weight: 500; text-align: right; }
</style>
