<script setup>
import { computed } from "vue";
import BaseDocumentCard from "../../base/BaseDocumentCard.vue";
import { useFormatters } from "../../../composables/useFormatters";
import { useOfferStatus } from "../../../composables/useOfferStatus";

/**
 * offer: { id, offerNumber, customerName, validUntil, totalGross, status }
 */
const props = defineProps({
	offer: { type: Object, required: true },
});

const emit = defineEmits(["select"]);

const { formatCurrency, formatDate } = useFormatters();
const { getOfferStatus } = useOfferStatus();

const status = computed(() => getOfferStatus(props.offer));
</script>

<template>
	<BaseDocumentCard
		:number="offer.offerNumber"
		:customer-name="offer.customerName"
		date-label="Gültig bis"
		:date="formatDate(offer.validUntil)"
		:date-state="offer.status === 'expired' ? 'expired' : 'normal'"
		:amount="formatCurrency(offer.totalGross)"
		:status-label="status.label"
		:status-severity="status.severity"
		@select="emit('select', offer)"
	/>
</template>
