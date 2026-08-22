
<script setup>
import Card from "primevue/card";

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


</script>

<template>
	<div class="offer-list-cards">
		<Card
			v-for="item in items" class="offer-list-card"
			:key="item.id ?? item.offerNumber"
			role="button"
			tabindex="0"
		>
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
</style>
