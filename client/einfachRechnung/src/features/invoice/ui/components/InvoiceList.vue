<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { FilterMatchMode } from "@primevue/core/api";

defineProps({
	items: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(["action"]);

// --- status mapping (UI labels) ---
const paymentStatusMap = {
	unpaid: "Unbezahlt",
	partial: "Teilzahlung",
	paid: "Bezahlt",
};

const invoiceStatusMap = {
	draft: "Entwurf",
	sent: "Gesendet",
	cancelled: "Storniert",
};

// --- table setup ---
const paymentStatuses = [
	{
		label: "Unbezahlt",
		value: "unpaid",
	},
	{
		label: "Teilzahlung",
		value: "partial",
	},
	{
		label: "Bezahlt",
		value: "paid",
	},
];

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
		label: "Storniert",
		value: "cancelled",
	},
];

const filters = ref({
	invoiceNumber: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	customer: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	paymentStatus: {
		value: null,
		matchMode: FilterMatchMode.EQUALS,
	},
	status: {
		value: null,
		matchMode: FilterMatchMode.EQUALS,
	},
});

// --- event handler ---
function onRowClick(event){
	emit("action", {
		action: "openInvoice",
		invoiceNumber: event.data.invoiceNumber,
	});
}
</script>

<template>
	<DataTable
		class="invoice-list-data-table"
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
			field="invoiceNumber"
			header="RechnungsNr."
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Rechnungsnummer suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="customer"
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

		<Column field="invoiceDate" header="Rechnungsdatum" sortable />

		<Column field="dueDate" header="Fälligkeitsdatum" sortable />

		<Column field="grossTotal" header="Gesamtsumme (Brutto)" sortable />

		<Column field="openAmount" header="Offener Betrag" sortable />

		<!-- payment status (mapped) -->
		<Column
			field="paymentStatus"
			header="Zahlungsstatus"
			sortable
			:showFilterMenu="false"
		>
			<template #body="{ data }">
				{{ paymentStatusMap[data.paymentStatus] }}
			</template>

			<template #filter="{ filterModel, filterCallback }">
				<Select
					v-model="filterModel.value"
					:options="paymentStatuses"
					optionLabel="label"
					optionValue="value"
					placeholder="Zahlungsstatus"
					:showClear="true"
					class="w-full"
					@change="filterCallback()"
				/>
			</template>
		</Column>

		<!-- invoice status (mapped) -->
		<Column
			field="status"
			header="Status"
			sortable
			:showFilterMenu="false"
		>
			<template #body="{ data }">
				{{ invoiceStatusMap[data.status] }}
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
.invoice-list-data-table {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--table-border-color);
}
</style>
