<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { StatusTag } from "@/shared/components";
import { formatCurrency } from "@/shared/helpers";
import { getInvoiceStatus, getPaymentStatus } from "../items/statusItems.js";
import InvoiceCard from "./InvoiceCard.vue";

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

// --- event handler ---
function onAction(event) {
	emit("action", event);
}

function onRowClick(event) {
	onAction({
		action: "openInvoice",
		invoiceNumber: event.data.invoiceNumber,
	});
}
</script>

<template>
	<div class="invoice-list">
		<DataTable
			class="invoice-list-data-table"
			:value="items"
			:loading="loading"
			size="large"
			dataKey="id"
			rowHover
			stripedRows
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
				align="right"
			>
				<template #body="{ data }">
					{{ formatAmount(data.grossTotal) }}
				</template>
			</Column>

			<Column
				field="openAmount"
				header="Offener Betrag"
				sortable
				align="right"
			>
				<template #body="{ data }">
					{{ formatAmount(data.openAmount) }}
				</template>
			</Column>

			<!-- payment status (mapped) -->
			<Column
				field="paymentStatus"
				header="Zahlungsstatus"
				sortable
			>
				<template #body="{ data }">
					<StatusTag
						:label="getPaymentStatus(data.paymentStatus).label"
						:severity="getPaymentStatus(data.paymentStatus).severity"
					/>
				</template>
			</Column>

			<!-- invoice status (mapped) -->
			<Column
				field="status"
				header="Status"
				sortable
			>
				<template #body="{ data }">
					<StatusTag
						:label="getInvoiceStatus(data.status).label"
						:severity="getInvoiceStatus(data.status).severity"
					/>
				</template>
			</Column>
		</DataTable>

		<div class="invoice-list-cards">
			<InvoiceCard
				v-for="item in items"
				:key="item.id ?? item.invoiceNumber"
				:invoice="item"
				@action="onAction"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.invoice-list {
	width: 100%;
	min-width: 0;
}

.invoice-list-data-table {
	width: 100%;
	min-width: 0;
	display: none;
	border: 1px solid var(--table-border-color);
}

.invoice-list-cards {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	justify-items: stretch;
	gap: var(--space-md);
}

@include media.up(bp.$bp-xl) {
	.invoice-list-data-table {
		display: flex;
	}

	.invoice-list-cards {
		display: none;
	}
}
</style>
