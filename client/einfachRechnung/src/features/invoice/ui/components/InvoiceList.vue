```vue
<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Divider from "primevue/divider";

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

// --- event handler ---
function onRowClick(event) {
	emit("action", {
		action: "openInvoice",
		invoiceNumber: event.data.invoiceNumber,
	});
}
</script>

<template>
	<DataTable
		class="invoice-list-data-table"
		:value="items"
		size="large"
		dataKey="id"
		rowHover
		:pt="{
			tableContainer: {
				style: {
					width: '100%',
				},
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
		/>

		<Column
			field="customer"
			header="Kunde"
			sortable
		/>

		<Column
			field="invoiceDate"
			header="Rechnungsdatum"
			sortable
		/>

		<Column
			field="dueDate"
			header="Fälligkeitsdatum"
			sortable
		/>

		<Column
			field="grossTotal"
			header="Gesamtsumme (Brutto)"
			sortable
		/>

		<Column
			field="openAmount"
			header="Offener Betrag"
			sortable
		/>

		<!-- payment status (mapped) -->
		<Column
			field="paymentStatus"
			header="Zahlungsstatus"
			sortable
		>
			<template #body="{ data }">
				{{ paymentStatusMap[data.paymentStatus] }}
			</template>
		</Column>

		<!-- invoice status (mapped) -->
		<Column
			field="status"
			header="Status"
			sortable
		>
			<template #body="{ data }">
				{{ invoiceStatusMap[data.status] }}
			</template>
		</Column>
	</DataTable>

	<div class="invoice-list-cards">
		<Card
			v-for="item in items"
			:key="item.id ?? item.invoiceNumber"
			class="card card--interactive"
			@click="onRowClick({ data: item })"
			@keydown.enter="onRowClick({ data: item })"
			@keydown.space.prevent="onRowClick({ data: item })"
		>
			<template #title>
				{{ item.invoiceNumber }}
			</template>

			<template #subtitle>
			</template>

			<template #content>
				<div class="card-content">
					<div class="card-content__item">
						<span>Kunde</span>

						<div class="card-content__item-value">
							{{ item.customer }}
						</div>
					</div>

					<div class="card-content__item">
						<span>Rechnungsdatum</span>

						<div class="card-content__item-value">
							{{ item.invoiceDate }}
						</div>
					</div>

					<div class="card-content__item">
						<span>Gesamtsumme</span>

						<div class="card-content__item-value">
							{{ item.grossTotal }}
						</div>
					</div>

					<Divider type="dashed" />

					<div class="card-content__item">
						<span>Zahlungsstatus</span>

						<div class="card-content__item-value">
							{{ paymentStatusMap[item.paymentStatus] }}
						</div>
					</div>

					<div class="card-content__item">
						<span>Status</span>

						<div class="card-content__item-value">
							{{ invoiceStatusMap[item.status] }}
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
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	grid-template-rows: repeat(auto-fit, minmax(200px, 305px));
	justify-items: center;
	gap: var(--space-md);
	margin-top: var(--space-xl);
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
```
