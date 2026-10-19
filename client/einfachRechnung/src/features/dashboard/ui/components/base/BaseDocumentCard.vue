<script setup>
import Button from "primevue/button";
import BaseStatusBadge from "./BaseStatusBadge.vue";

// Reine Darstellung: bekommt nur fertig formatierte Werte
defineProps({
	number: { type: String, required: true },
	customerName: { type: String, default: "" },
	dateLabel: { type: String, required: true }, // z. B. "Fällig"
	date: { type: String, required: true }, // bereits formatiert
	dateState: {
		type: String,
		default: "normal",
		validator: (value) => ["normal", "danger", "expired"].includes(value),
	},
	amount: { type: String, required: true }, // bereits formatiert
	statusLabel: { type: String, required: true },
	statusSeverity: { type: String, default: "secondary" },
});

const emit = defineEmits(["select"]);
</script>

<template>
	<!-- Die ganze Karte ist antippbar. Der Nummern-Button bleibt für Tastatur und
	     Screenreader fokussierbar; sein Klick steigt zur Karte auf. -->
	<article class="document-card" @click="emit('select')">
		<header class="document-card__top">
			<Button
				:label="number"
				:aria-label="`${number} öffnen`"
				variant="link"
				size="small"
				class="document-card__number"
			/>
			<BaseStatusBadge :label="statusLabel" :severity="statusSeverity" />
		</header>

		<p class="document-card__customer">{{ customerName || "–" }}</p>

		<footer class="document-card__bottom">
			<span :class="['document-card__date', `document-card__date--${dateState}`]">
				{{ dateLabel }} {{ date }}
			</span>
			<strong class="document-card__amount">{{ amount }}</strong>
		</footer>
	</article>
</template>

<style scoped>
.document-card {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.875rem 1rem;
	border: 1px solid var(--p-content-border-color);
	border-radius: var(--p-content-border-radius);
	background: var(--p-content-background);
	cursor: pointer;
	transition: background-color 0.15s;
}

.document-card:hover {
	background: var(--p-content-hover-background);
}

.document-card__top,
.document-card__bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
}

.document-card__number {
	padding: 0;
	font-weight: 600;
}

.document-card__customer {
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.document-card__date {
	font-size: 0.8125rem;
	color: var(--p-text-muted-color);
}

.document-card__date--danger {
	color: var(--p-red-500);
	font-weight: 600;
}

.document-card__date--expired {
	text-decoration: line-through;
}

.document-card__amount {
	font-size: 1.0625rem;
}
</style>
