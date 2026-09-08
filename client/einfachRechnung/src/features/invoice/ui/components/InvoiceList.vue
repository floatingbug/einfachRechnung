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
			tableContainer: {
				style: {
					width: '100%',
				}
			},
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

	<div class="invoice-list-cards">
		<Card v-for="item in items" class="list-card"
			:key="item.id ?? item.invoiceNumber"
			@click="onRowClick({ data: item })"
			@keydown.enter="onRowClick({ data: item })"
			@keydown.space.prevent="onRowClick({ data: item })"
		> <template #title>{{ item.invoiceNumber }}</template>
			<template #subtitle>
			</template>
			<template #content>
				<div class="card-content">
					<div class="card-content__item">
						<span>Kunde</span>

						<div class="card-content__item-value">
							{{item.customer}}
						</div>
					</div>

					<div class="card-content__item">
						<span>Rechnungsdatum</span>

						<div class="card-content__item-value">
							{{item.invoiceDate}}
						</div>
					</div>

					<div class="card-content__item">
						<span>Gesamtsumme</span>

						<div class="card-content__item-value">
							{{item.grossTotal}}
						</div>
					</div>

					<Divider
						type="dashed"
					/>

					<div class="card-content__item">
						<span>Zahlungsstatus</span>

						<div class="card-content__item-value">
							{{item.paymentStatus}}
						</div>
					</div>

					<div class="card-content__item">
						<span>Status</span>

						<div class="card-content__item-value">
							{{item.status}}
						</div>
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>

<style scoped lang="scss">
.invoice-list-data-table {
	width: 100%;
	min-width: 0;
	display: none;
	border: 1px solid var(--table-border-color);
}

.invoice-list-cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
	grid-template-rows: repeat(auto-fit, minmax(200px, 305px));
	gap: var(--space-md);
}

.list-card {
	max-width: 500px;
}

.card-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.card-content__item {
	display: flex;
	justify-content: space-between;
}

@media (min-width: 2027px) {
	.invoice-list-data-table {
		display: flex;
	}

	.invoice-list-cards {
		display: none;
	}
}
</style>
