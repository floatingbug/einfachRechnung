<script setup>
import { computed } from "vue";
import BaseDocumentCard from "../../base/BaseDocumentCard.vue";
import { useFormatters } from "../../../composables/useFormatters";
import { useInvoiceStatus } from "../../../composables/useInvoiceStatus";

/**
 * invoice: { id, invoiceNumber, customerName, dueDate, totalGross, status, paymentStatus, isOverdue }
 */
const props = defineProps({
	invoice: { type: Object, required: true },
});

const emit = defineEmits(["select"]);

const { formatCurrency, formatDate } = useFormatters();
const { getInvoiceStatus } = useInvoiceStatus();

const status = computed(() => getInvoiceStatus(props.invoice));
</script>

<template>
	<BaseDocumentCard
		:number="invoice.invoiceNumber"
		:customer-name="invoice.customerName"
		date-label="Fällig"
		:date="formatDate(invoice.dueDate)"
		:date-state="invoice.isOverdue ? 'danger' : 'normal'"
		:amount="formatCurrency(invoice.totalGross)"
		:status-label="status.label"
		:status-severity="status.severity"
		@select="emit('select', invoice)"
	/>
</template>
