<script setup>
import { computed } from "vue";
import DashboardInvoiceCard from "./components/DashboardInvoiceCard.vue";
import DashboardOfferCard from "./components/DashboardOfferCard.vue";

/**
 * Rendert eine Liste von Karten für Rechnungen oder Angebote.
 * type:  "invoice" | "offer"
 * items: store.recentInvoices bzw. store.recentOffers
 */
const props = defineProps({
	type: {
		type: String,
		required: true,
		validator: (value) => ["invoice", "offer"].includes(value),
	},
	items: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(["select"]);

const emptyText = computed(() =>
	props.type === "invoice"
		? "Noch keine Rechnungen vorhanden."
		: "Noch keine Angebote vorhanden."
);
</script>

<template>
	<p v-if="items.length === 0" class="card-list__empty">{{ emptyText }}</p>

	<ul v-else class="card-list">
		<li v-for="item in items" :key="item.id">
			<DashboardInvoiceCard
				v-if="type === 'invoice'"
				:invoice="item"
				@select="emit('select', $event)"
			/>
			<DashboardOfferCard
				v-else
				:offer="item"
				@select="emit('select', $event)"
			/>
		</li>
	</ul>
</template>

<style scoped>
.card-list {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.card-list__empty {
	margin: 0;
	color: var(--p-text-muted-color);
}
</style>
