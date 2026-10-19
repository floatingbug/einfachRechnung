<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import BaseStatusBadge from "../base/BaseStatusBadge.vue";
import { useFormatters } from "../../composables/useFormatters";
import { useInvoiceStatus } from "../../composables/useInvoiceStatus";

/**
 * invoices: store.recentInvoices
 * [{ id, invoiceNumber, customerName, dueDate, totalGross, status, paymentStatus, isOverdue }]
 */
defineProps({
	invoices: {
		type: Array,
		default: () => [],
	},
});

// Die Navigation übernimmt der Parent, die Komponente kennt keine Routen
const emit = defineEmits(["select", "view-all"]);

const { formatCurrency, formatDate } = useFormatters();
const { getInvoiceStatus } = useInvoiceStatus();
</script>

<template>
	<Card class="recent-invoices">
		<template #title>
			<div class="recent-invoices__header">
				<span>Letzte Rechnungen</span>
				<Button
					label="Alle anzeigen"
					variant="link"
					size="small"
					@click="emit('view-all')"
				/>
			</div>
		</template>

		<template #content>
			<DataTable :value="invoices" data-key="id" scrollable size="small">
				<template #empty>
					<span class="recent-invoices__empty">Noch keine Rechnungen vorhanden.</span>
				</template>

				<Column header="Nr.">
					<template #body="{ data }">
						<Button
							:label="data.invoiceNumber"
							variant="link"
							size="small"
							class="recent-invoices__link"
							@click="emit('select', data)"
						/>
					</template>
				</Column>

				<Column header="Kunde">
					<template #body="{ data }">{{ data.customerName || "–" }}</template>
				</Column>

				<Column header="Fällig">
					<template #body="{ data }">
						<span :class="{ 'recent-invoices__overdue': data.isOverdue }">
							{{ formatDate(data.dueDate) }}
						</span>
					</template>
				</Column>

				<Column header="Betrag" header-class="recent-invoices__right" body-class="recent-invoices__right">
					<template #body="{ data }">{{ formatCurrency(data.totalGross) }}</template>
				</Column>

				<Column header="Status">
					<template #body="{ data }">
						<BaseStatusBadge v-bind="getInvoiceStatus(data)" />
					</template>
				</Column>
			</DataTable>
		</template>
	</Card>
</template>

<style scoped>
.recent-invoices {
	min-width: 0;
}

.recent-invoices__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
}

.recent-invoices__link {
	padding: 0;
	white-space: nowrap;
}

.recent-invoices__overdue {
	color: var(--p-red-500);
	font-weight: 600;
}

.recent-invoices__empty {
	color: var(--p-text-muted-color);
}

/* Betragsspalte rechtsbündig (Header + Zellen) */
.recent-invoices :deep(.recent-invoices__right) {
	text-align: right;
}

.recent-invoices :deep(th.recent-invoices__right .p-datatable-column-header-content) {
	justify-content: flex-end;
}
</style>
