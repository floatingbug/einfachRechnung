<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import BaseStatusBadge from "../base/BaseStatusBadge.vue";
import { useFormatters } from "../../composables/useFormatters";
import { useOfferStatus } from "../../composables/useOfferStatus";

/**
 * offers: store.recentOffers
 * [{ id, offerNumber, customerName, validUntil, totalGross, status }]
 */
defineProps({
	offers: {
		type: Array,
		default: () => [],
	},
});

// Die Navigation übernimmt der Parent, die Komponente kennt keine Routen
const emit = defineEmits(["select", "view-all"]);

const { formatCurrency, formatDate } = useFormatters();
const { getOfferStatus } = useOfferStatus();
</script>

<template>
	<Card class="recent-offers">
		<template #title>
			<div class="recent-offers__header">
				<span>Letzte Angebote</span>
				<Button
					label="Alle anzeigen"
					variant="link"
					size="small"
					@click="emit('view-all')"
				/>
			</div>
		</template>

		<template #content>
			<DataTable :value="offers" data-key="id" scrollable size="small">
				<template #empty>
					<span class="recent-offers__empty">Noch keine Angebote vorhanden.</span>
				</template>

				<Column header="Nr.">
					<template #body="{ data }">
						<Button
							:label="data.offerNumber"
							variant="link"
							size="small"
							class="recent-offers__link"
							@click="emit('select', data)"
						/>
					</template>
				</Column>

				<Column header="Kunde">
					<template #body="{ data }">{{ data.customerName || "–" }}</template>
				</Column>

				<Column header="Gültig bis">
					<template #body="{ data }">
						<span :class="{ 'recent-offers__expired': data.status === 'expired' }">
							{{ formatDate(data.validUntil) }}
						</span>
					</template>
				</Column>

				<Column header="Betrag" header-class="recent-offers__right" body-class="recent-offers__right">
					<template #body="{ data }">{{ formatCurrency(data.totalGross) }}</template>
				</Column>

				<Column header="Status">
					<template #body="{ data }">
						<BaseStatusBadge v-bind="getOfferStatus(data)" />
					</template>
				</Column>
			</DataTable>
		</template>
	</Card>
</template>

<style scoped>
.recent-offers {
	min-width: 0;
}

.recent-offers__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
}

.recent-offers__link {
	padding: 0;
	white-space: nowrap;
}

.recent-offers__expired {
	color: var(--p-text-muted-color);
	text-decoration: line-through;
}

.recent-offers__empty {
	color: var(--p-text-muted-color);
}

/* Betragsspalte rechtsbündig (Header + Zellen) */
.recent-offers :deep(.recent-offers__right) {
	text-align: right;
}

.recent-offers :deep(th.recent-offers__right .p-datatable-column-header-content) {
	justify-content: flex-end;
}
</style>
